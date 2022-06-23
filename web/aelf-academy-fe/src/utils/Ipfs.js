import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";

export const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export async function uploadDataToIpfs(inputData) {
    const data =  JSON.stringify({
        toc: inputData.toc,
        introduction: inputData.introduction,
        challengeDescription: inputData.challengeDescription,
        content: inputData.content
      });
    //uploads stringified data to ipfs
    try {
      // save to save data to IPFS
      const added = await client.add(data);
      // IPFS url for uploaded metadata
      return `https://ipfs.io/ipfs/${added.path}`;
  
    } catch(error){
        console.log(error);
    }
}



// get the data from IPFS
export const fetchDataFromIpfs = async (ipfsUrl) => {
    try {
        if (!ipfsUrl) return null;
        const data = await axios.get(ipfsUrl);
        return data;
    } catch (e) {
        console.log({e});
    }
};

