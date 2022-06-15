import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";

export const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export async function uploadDataToIpfs(data) {
    //uploads stringified data to ipfs
    try {
      // save to save data to IPFS
      const added = await client.add(data);
      // IPFS url for uploaded metadata
      const url = `https://ipfs.io/ipfs/${added.path}`;
  
    } catch(error){
        ipfs: 'https://ipfs.infura.io'
    }
    return url;
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

