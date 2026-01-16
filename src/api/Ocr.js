import axios from "axios";

export async function extractTextFromImage(input) {
  let combinedText = "";

  //single file ko array bana do
  const files = Array.isArray(input)
    ? input
    : input instanceof FileList
    ? Array.from(input)
    : [input];

  for (const file of files) {
    if (!file) continue;

    const formData = new FormData();
    formData.append("apikey", "K87595561088957");
    formData.append("language", "eng");
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://api.ocr.space/Parse/Image",
        formData,
        {
          maxBodyLength: Infinity,
          //headers mat do (browser auto handle)
        }
      );

      const data = response.data;

      if (!data?.IsErroredOnProcessing && data?.ParsedResults?.length > 0) {
        let text = data.ParsedResults[0].ParsedText || "";
        combinedText +=
          text
            .replace(/'/g, "`")
            .replace(/\n/g, "; ")
            .replace(/\r/g, "")
            .replace(/\t/g, " ") + " ";
      } else {
        console.error("OCR error:", data?.ErrorMessage);
      }
    } catch (err) {
      console.error("API failed:", err);
    }
  }

  return combinedText.trim();
}

export function parseAadhaarText(text) {
    const nameMatch = text.match(/([A-Z][a-z]+\s[A-Z][a-z]+)/);
    const dobMatch = text.match(/DOB[:\s-]*(\d{2}\/\d{2}\/\d{4})/i);
    const genderMatch = text.match(/\b(MALE|FEMALE|TRANSGENDER)\b/i);
    const aadhaarMatch = text.match(/\b\d{4}\s\d{4}\s\d{4}\b/);

    // Extract the address portion (everything after 'Address:' or similar)
    const addressMatch = text.match(/Address[:\s-]*(.*)/i);

    let address = addressMatch ? addressMatch[1].replace(/\s+/g, " ").trim() : "";

    // Extract PIN Code (6-digit)
    const pinMatch = text.match(/\b\d{6}\b/);
    const pinCode = pinMatch ? pinMatch[0] : "";

    // Extract State (basic pattern to catch Rajasthan, Maharashtra, etc.)
    const stateMatch = text.match(
        /\b(Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chhattisgarh|Goa|Gujarat|Haryana|Himachal Pradesh|Jharkhand|Karnataka|Kerala|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Odisha|Punjab|Rajasthan|Sikkim|Tamil Nadu|Telangana|Tripura|Uttar Pradesh|Uttarakhand|West Bengal|Delhi|Puducherry|Chandigarh|Jammu and Kashmir)\b/i
    );
    const state = stateMatch ? stateMatch[0] : "";

    // Try to extract City (just before state or pin)
    let city = "";
    if (state && text.includes(state)) {
        const cityPart = text.split(state)[0];
        const cityMatch = cityPart.match(/([A-Za-z]+)[,\s;]*$/);
        city = cityMatch ? cityMatch[1] : "";
    }

    return {
        name: nameMatch ? nameMatch[1] : "",
        DOB: dobMatch ? dobMatch[1] : "",
        gender: genderMatch ? genderMatch[1].toUpperCase() : "",
        aadhaarNumber: aadhaarMatch ? aadhaarMatch[0] : "",
        address,
        city,
        state,
        pinCode,
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