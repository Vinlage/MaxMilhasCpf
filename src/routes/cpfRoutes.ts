import { Router } from "express";
import { addCpf, checkCpf, removeCpf, allCpf  } from "../controllers/cpfController" ;

const router: Router = Router();

router.post("/cpf", addCpf);
router.get("/cpf/:cpf", checkCpf);
router.delete("/cpf/:cpf", removeCpf)
router.get("/cpf", allCpf);

export default router;