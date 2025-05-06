import { config } from "dotenv";
import { defaultAdmin, defaultCategory, defaultSupplier, initServer } from "./configs/server.js"

config()
initServer()
defaultAdmin()
defaultCategory()
defaultSupplier()