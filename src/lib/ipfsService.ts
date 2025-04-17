import { RaiseMetadata } from "@/types/contract-types";
import axios from "axios";

const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
const PINATA_SECRET_KEY = import.meta.env.VITE_PINATA_SECRET_KEY;
const PINATA_GATEWAY =
  import.meta.env.VITE_PINATA_GATEWAY || "https://gateway.pinata.cloud/ipfs";

export const uploadToPinata = async (
  metadata: RaiseMetadata,
): Promise<string> => {
  try {
    const data = JSON.stringify({
      pinataOptions: {
        cidVersion: 1,
      },
      pinataMetadata: {
        name: `${metadata.name}-metadata`,
      },
      pinataContent: metadata,
    });

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: PINATA_API_KEY!,
          pinata_secret_api_key: PINATA_SECRET_KEY!,
        },
      },
    );

    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    throw new Error("Failed to upload metadata to IPFS");
  }
};

export const getMetadataFromIPFS = async (
  ipfsUrl: string,
): Promise<RaiseMetadata> => {
  try {
    const hash = ipfsUrl.replace("ipfs://", "");
    const response = await axios.get(`${PINATA_GATEWAY}/${hash}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching from Pinata:", error);
    throw new Error("Failed to fetch metadata from IPFS");
  }
};
