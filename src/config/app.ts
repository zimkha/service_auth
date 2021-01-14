import express,{Application} from 'express';
import config from 'config';
import consola from 'consola';
import helmet from 'helmet'

const env = config.get('env') as string;
const port = config.get('PORT') as number;
export function start(){
    const app: Application = express();
    try{
        if(env==="production"){
            app.use(helmet());
        }
        app.listen(port,()=>consola.info(`Server running on port ${port}`))
    }catch(e){
        throw new Error(e.message);
    }
}