import { HfInference } from '@huggingface/inference'
import dotenv from 'dotenv'
dotenv.config()

export const summarizeBook =async(text)=>{
    try{
        const inference = new HfInference(process.env.HF_TOKEN);
        const summary = await inference.summarization({
            model: "sshleifer/distilbart-cnn-12-6",
            inputs: text,
            max_length: 300,
        });
        return summary;
    }catch(error){
     console.log('An error occured while summarizing the text: ' + error)
    }
}