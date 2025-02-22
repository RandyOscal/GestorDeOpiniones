import { version } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "API Gestion Opinion",
            version:"1.0.0",
            description: "API para gestionar opiniones y comentarios",
            contact:{
                name: "Randy Oscal",
                email: "roscal-2023279@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/gestionOpinion/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/user/*.js"
        
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi }