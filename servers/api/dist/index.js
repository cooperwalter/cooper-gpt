var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
var app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
var PORT = 8000;
var BASE_URL = 'https://api.openai.com/v1';
app.post('/completions', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var message, options, response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                message = {
                    role: 'user',
                    content: req.body.message,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                options = {
                    method: 'POST',
                    headers: {
                        Authorization: "Bearer ".concat(process.env.OPENAI_API_KEY),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        max_tokens: 100,
                        messages: [message],
                    })
                };
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/chat/completions"), options)];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = (_a.sent());
                res.send(data);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                // tslint:disable-next-line:no-console
                console.error(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// tslint:disable-next-line:no-console
app.listen(PORT, function () { return console.log("Your server is running on PORT ".concat(PORT)); });
