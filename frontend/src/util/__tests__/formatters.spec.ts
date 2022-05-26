import { formatPrice } from "util/formatters";

describe('formatPrice for positive numbers', () => {
    test('formatPrice should format number pt-BR when given 15.25', () => {
        //PADRÃO A-A-A

        //Arrange
        const value = 15.25;

        //Act
        const result = formatPrice(value);

        //Assert
        expect(result).toEqual("15,25");
    });
});

describe('formatPrice for non-positive numbers', () => {
    test('formatPrice should format number pt-BR when given 0.0', () => {
        //PADRÃO A-A-A

        //Arrange
        const value = 0.0;

        //Act
        const result = formatPrice(value);

        //Assert
        expect(result).toEqual("0,00");
    });

    test('formatPrice should format number pt-BR when given -1.0', () => {
        //PADRÃO A-A-A

        //Arrange
        const value = -1.0;

        //Act
        const result = formatPrice(value);

        //Assert
        expect(result).toEqual("-1,00");
    });
});

