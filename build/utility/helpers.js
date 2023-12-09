var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
const salt_value = 10;
export const hash_password = (plain_password) => __awaiter(void 0, void 0, void 0, function* () { return yield bcrypt.hash(plain_password, salt_value); });
export const compare_password = (password, hash) => __awaiter(void 0, void 0, void 0, function* () { return yield bcrypt.compare(password, hash); });
