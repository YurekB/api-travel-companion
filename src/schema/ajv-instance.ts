// ESM/TypeScript import
import Ajv from "ajv"
import addFormats from "ajv-formats"


const ajvInstance = new Ajv()
addFormats(ajvInstance)

export default ajvInstance