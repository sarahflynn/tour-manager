const getErrors = (validation, numberExpected) => {
    expect(validation).toBeDefined();
    const error = validation.errors;
    expect(Object.keys(errors)).toHaveLength(numberExpected);
    return errors;
};

module.exports = {
    getErrors
};