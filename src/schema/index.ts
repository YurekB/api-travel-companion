import ajvInstance from "./ajv-instance" 

export const leadSchema = {
  type: "object",
  properties: {
    version: {type: 'string'},
    title: {
      type: 'string',
      enum: ['Mr',"Mrs", "Miss", "Dr"] 
    },
    firstName: {type: 'string'},
    lastName: {type: 'string'},
    email: {type: 'string', format: 'email'},
    phone: {type: 'string'},
    dob: {type: 'string', format: 'date'},
  },
  required: ['version','title', 'firstName', 'lastName', 'email', 'phone', 'dob'],
  optionalProperties: true
}

const validateLead = ajvInstance.compile(leadSchema)


export { validateLead }