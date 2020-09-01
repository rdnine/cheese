"use strict";
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
        while (_) try {
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
var Cheese = (function () {
    function Cheese(settings) {
        this.stream = "video";
        this.canvas = "canvas";
        this.target = "img";
        this.active = false;
        this.constrains = {
            video: {
                facingMode: "environment",
                width: {
                    min: 640,
                    ideal: 1080,
                    max: 1920,
                },
                height: {
                    min: 640,
                    ideal: 1080,
                    max: 1080,
                },
                frameRate: {
                    ideal: 30,
                    max: 60,
                },
                aspectRatio: 1,
            },
            audio: false,
        };
        this.pictures = [];
        this.video__element = document.querySelector(this.stream);
        this.canvas__element = document.querySelector(this.canvas);
        this.target__element = document.querySelector(this.target);
        if ("stream" in settings) {
            this.video__element = document.querySelector(settings.stream);
        }
        if ("canvas" in settings) {
            this.canvas__element = document.querySelector(settings.canvas);
        }
        if ("target" in settings) {
        }
        if ("video" in settings) {
            if ("width" in settings.video) {
                this.constrains.video.width.ideal = settings.video.width;
            }
            if ("height" in settings.video) {
                this.constrains.video.height.ideal = settings.video.height;
            }
            if ("frameRate" in settings.video) {
                this.constrains.video.frameRate.ideal = settings.video.frameRate;
            }
        }
    }
    Cheese.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        if (!_this.active) {
                            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                                navigator.mediaDevices
                                    .getUserMedia(_this.constrains)
                                    .then(function (stream) {
                                    _this.video__element.srcObject = stream;
                                    _this.video__element.play();
                                    _this.active = true;
                                    resolve();
                                })
                                    .catch(function (err) {
                                    reject(err.name + ": " + err.message);
                                    alert("No device found. Check the logs for error!");
                                });
                            }
                            else if (navigator.getUserMedia) {
                                navigator.getUserMedia({ video: true }, function (stream) {
                                    _this.video__element.srcObject = stream;
                                    _this.video__element.play();
                                    _this.active = true;
                                    resolve();
                                }, function (err) {
                                    reject(err);
                                });
                            }
                            else {
                                throw new Error("Your browser is not supported");
                            }
                        }
                        else {
                            alert("Webcam already active");
                        }
                    })];
            });
        });
    };
    Cheese.prototype.stop = function () {
        var stream = this.video__element.srcObject;
        if (this.active) {
            var tracks = stream.getTracks();
            tracks.forEach(function (track) {
                track.stop();
            });
            this.video__element.srcObject = null;
        }
        else {
            alert("Can't stop what hasn't started!");
        }
    };
    Cheese.prototype.snap = function () {
        if (this.active) {
            var context = this.canvas__element.getContext("2d");
            context.drawImage(this.video__element, (this.video__element.videoWidth - this.canvas__element.width) / 2, 0, this.canvas__element.height, this.canvas__element.width, 0, 0, this.canvas__element.width, this.canvas__element.height);
            this.pictures[this.pictures.length] = this.canvas__element.toDataURL("image/jpeg", 1);
            this.target__element.src = this.pictures[this.pictures.length - 1];
            this.target__element.classList.add("active");
            return true;
        }
        else {
            alert("Webcam not active!");
            return false;
        }
    };
    Cheese.prototype.save = function () {
        if (this.active) {
            var a = document.createElement("a");
            a.href = this.target__element.src;
            a.download = "snap.jpg";
            a.click();
            a.remove();
        }
    };
    Cheese.prototype.clear = function () {
        this.pictures = [];
    };
    Cheese.prototype.log = function () {
        console.log(this);
    };
    return Cheese;
}());
//# sourceMappingURL=cheese.js.map