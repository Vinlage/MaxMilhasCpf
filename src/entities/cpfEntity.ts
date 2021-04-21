import { ICpf } from "../types/cpfTypes"
import { model, Schema } from "mongoose"

const cpfSchema: Schema = new Schema(
    {
        cpf: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

export default model<ICpf>("Cpf", cpfSchema);