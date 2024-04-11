"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomHexCode = void 0;
const getRandomHexCode = () => {
    const hexChars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * hexChars.length);
        color += hexChars[randomIndex];
    }
    return color;
};
exports.getRandomHexCode = getRandomHexCode;
//# sourceMappingURL=utils.js.map