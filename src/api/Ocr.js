import axios from "axios";

export async function getCityStateFromPincode(pincode) {
  try {
    const res = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    );

    const data = await res.json();

    if (
      data[0]?.Status === "Success" &&
      data[0]?.PostOffice?.length
    ) {
      const po = data[0].PostOffice[0];

      return {
        city: po.District,
        state: po.State
      };
    }
  } catch (err) {
    console.error("Pincode API error:", err.message);
  }

  return { city: "", state: "" };
}

export async function extractTextFromImage(input) {
  console.log("caall");
  console.log("input", input);

  const files = Array.isArray(input)
    ? input
    : input instanceof FileList
      ? Array.from(input)
      : [input];

  if (!files.length) return "";

  const requests = files.map(async (file, index) => {
    if (!file) return "";

    const formData = new FormData();
    formData.append("apikey", "K87595561088957");
    formData.append("language", "eng");
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://api.ocr.space/Parse/Image",
        formData,
        { maxBodyLength: Infinity }
      );

      const data = res.data;

      if (data?.IsErroredOnProcessing) {
        console.error(`OCR error [${file.name}]`, data.ErrorMessage);
        return "";
      }

      if (!data?.ParsedResults?.length) {
        console.warn(`No text found [${file.name}]`);
        return "";
      }

      //merge ALL parsed blocks
      const text = data.ParsedResults
        .map(r => r.ParsedText || "")
        .join(" ");

      return text
        .replace(/'/g, "`")
        .replace(/\n|\r/g, " ")
        .replace(/\t/g, " ")
        .trim();

    } catch (err) {
      console.error(`API failed [${file.name}]`, err);
      return "";
    }
  });

  const results = await Promise.all(requests);

  console.log("results", results);

  return results.filter(Boolean).join(" ");
}
// export function parseAadhaarText(text) {
//   const nameMatch = text.match(/([A-Z][a-z]+\s[A-Z][a-z]+)/);
//   const dobMatch = text.match(/DOB[:\s-]*(\d{2}\/\d{2}\/\d{4})/i);
//   const genderMatch = text.match(/\b(MALE|FEMALE|TRANSGENDER)\b/i);
//   const aadhaarMatch = text.match(/\b\d{4}\s\d{4}\s\d{4}\b/);

//   // Extract the address portion (everything after 'Address:' or similar)
//   const addressMatch = text.match(/Address[:\s-]*(.*)/i);

//   let address = addressMatch ? addressMatch[1].replace(/\s+/g, " ").trim() : "";

//   // Extract PIN Code (6-digit)
//   const pinMatch = text.match(/\b\d{6}\b/);
//   const pinCode = pinMatch ? pinMatch[0] : "";

//   // Extract State (basic pattern to catch Rajasthan, Maharashtra, etc.)
//   const stateMatch = text.match(
//     /\b(Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chhattisgarh|Goa|Gujarat|Haryana|Himachal Pradesh|Jharkhand|Karnataka|Kerala|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Odisha|Punjab|Rajasthan|Sikkim|Tamil Nadu|Telangana|Tripura|Uttar Pradesh|Uttarakhand|West Bengal|Delhi|Puducherry|Chandigarh|Jammu and Kashmir)\b/i
//   );
//   const state = stateMatch ? stateMatch[0] : "";

//   // Try to extract City (just before state or pin)
//   let city = "";
//   if (state && text.includes(state)) {
//     const cityPart = text.split(state)[0];
//     const cityMatch = cityPart.match(/([A-Za-z]+)[,\s;]*$/);
//     city = cityMatch ? cityMatch[1] : "";
//   }

//   return {
//     name: nameMatch ? nameMatch[1] : "",
//     DOB: dobMatch ? dobMatch[1] : "",
//     gender: genderMatch ? genderMatch[1].toUpperCase() : "",
//     aadhaarNumber: aadhaarMatch ? aadhaarMatch[0] : "",
//     address,
//     city,
//     state,
//     pinCode,
//   };
// 
function normalizeText(text = "") {
  return text
    .replace(/\s+/g, " ")
    .replace(/[|_¯]/g, " ")
    .replace(/Rajastlan/gi, "Rajasthan") // common OCR issue
    .replace(/Jhoovara/gi, "Jhotwara")
    .trim();
}
export async function parseAadhaarText(rawText) {
  const text = normalizeText(rawText);

  // NAME
  const nameMatch = text.match(/\b([A-Z][a-z]+\s[A-Z][a-z]+)\b/);

  // DOB
  const dobMatch = text.match(/(\d{2}\/\d{2}\/\d{4})/);

  // GENDER
  const genderMatch = text.match(/\b(MALE|FEMALE|TRANSGENDER)\b/i);

  // AADHAAR NUMBER
  const aadhaarMatch = text.match(/\b\d{4}\s\d{4}\s\d{4}\b/);

  // PINCODE
  const pinMatch = text.match(/\b\d{6}\b/);
  const pinCode = pinMatch ? pinMatch[0] : "";

  // ADDRESS (optional – noisy hota hai)
  const addressMatch = text.match(/Address[:\s-]*(.*)/i);
  const address = addressMatch
    ? addressMatch[1].split(pinCode)[0].trim()
    : "";

  // 🔥 CITY + STATE from PINCODE API
  let city = "";
  let state = "";

  if (pinCode) {
    const location = await getCityStateFromPincode(pinCode);
    city = location.city;
    state = location.state;
  }

  return {
    name: nameMatch?.[1] || "",
    DOB: dobMatch?.[1] || "",
    gender: genderMatch?.[1]?.toUpperCase() || "",
    aadhaarNumber: aadhaarMatch?.[0] || "",
    address,
    city,
    state,
    pinCode
  };
}

export const calculateAge = (dob) => {
  if (!dob) return null;

  const cleanDob = dob.replace(/[-.]/g, "/");
  const [day, month, year] = cleanDob.split("/").map(Number);

  if (!day || !month || !year) return null;

  const birthDate = new Date(year, month - 1, day);
  if (isNaN(birthDate)) return null;

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];