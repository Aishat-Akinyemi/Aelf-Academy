import BigNumber from "bignumber.js";

export const unitConverter = {
    toLower : (n,d)=>{
        let res = new BigNumber(n);
        d = new BigNumber(10).pow(d) ;
        return res.div(d).toString(); 
      },
  
      toHigher : (n,d)=>{
        let res = new BigNumber(n);
        d = new BigNumber(10).pow(d);
        return res.multiply(d).toString(); 
      },
      
};