import { formatPrice } from "util/formatters";

test('formatPrice should format number pt-BR when given 15.25', () => {
    //PADRÃO A-A-A
    
    //Arrange
    const value = 15.25;

    //Act
    const result = formatPrice(value);

    //Assert
    expect(result).toEqual("15,25");
})