const FormatCurrency = (value) => {
    const stringValue = String(value); // Chuyển đổi giá trị thành chuỗi
    const parts = stringValue.split('.'); // Tách phần nguyên và phần thập phân (nếu có)

    // Định dạng phần nguyên
    let formattedValue = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Nếu có phần thập phân, thêm vào chuỗi định dạng
    if (parts.length > 1) {
        formattedValue += `.${parts[1]}`;
    }

    // Thêm ký hiệu tiền tệ
    formattedValue += 'đ';

    return formattedValue;
}

export default FormatCurrency