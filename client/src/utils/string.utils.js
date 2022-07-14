export const doesStringContainANumber = (str) => {
    for (let i = 0; i < str.length; i++) {
        if (str[i] >= '0' && str[i] <= '9') {
            return true;
        }
    }

    return false;
};
