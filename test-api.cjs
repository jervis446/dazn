"use strict";
// test-api.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var baseUrl = 'http://localhost:3000/api'; // Update with your actual server address
function testAllEndpoints() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Test GET /movies
                return [4 /*yield*/, testGetMovies()];
                case 1:
                    // Test GET /movies
                    _a.sent();
                    // Test GET /search
                    return [4 /*yield*/, testSearchMovies()];
                case 2:
                    // Test GET /search
                    _a.sent();
                    // Test POST /movies
                    return [4 /*yield*/, testCreateMovie()];
                case 3:
                    // Test POST /movies
                    _a.sent();
                    // Test PUT /movies/:id
                    return [4 /*yield*/, testUpdateMovie()];
                case 4:
                    // Test PUT /movies/:id
                    _a.sent();
                    // Test DELETE /movies/:id
                    return [4 /*yield*/, testDeleteMovie()];
                case 5:
                    // Test DELETE /movies/:id
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function testGetMovies() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Testing GET /movies');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, node_fetch_1.default)("".concat(baseUrl, "/movies"))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log('Response:', data);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function testSearchMovies() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Testing GET /search?q=Action');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, node_fetch_1.default)("".concat(baseUrl, "/search?q=Action"))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log('Response:', data);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error:', error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function testCreateMovie() {
    return __awaiter(this, void 0, void 0, function () {
        var movieData, response, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Testing POST /movies');
                    movieData = {
                        title: 'Test Movie',
                        genre: 'Test Genre',
                        rating: 3.5,
                        streamingLink: 'https://test-example.com',
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, node_fetch_1.default)("".concat(baseUrl, "/movies"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(movieData),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log('Response:', data);
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error('Error:', error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function testUpdateMovie() {
    return __awaiter(this, void 0, void 0, function () {
        var updatedMovieData, movieIdToUpdate, response, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Testing PUT /movies/:id');
                    updatedMovieData = {
                        title: 'Updated Test Movie',
                        genre: 'Updated Test Genre',
                        rating: 4.2,
                        streamingLink: 'https://updated-test-example.com',
                    };
                    movieIdToUpdate = '654a838297863c1d6349fecb';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, node_fetch_1.default)("".concat(baseUrl, "/movies/").concat(movieIdToUpdate), {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedMovieData),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log('Response:', data);
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error('Error:', error_4);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function testDeleteMovie() {
    return __awaiter(this, void 0, void 0, function () {
        var movieIdToDelete, response, data, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Testing DELETE /movies/:id');
                    movieIdToDelete = '654a838297863c1d6349fecb';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, node_fetch_1.default)("".concat(baseUrl, "/movies/").concat(movieIdToDelete), {
                            method: 'DELETE',
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log('Response:', data);
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    console.error('Error:', error_5);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Run all tests
testAllEndpoints();
