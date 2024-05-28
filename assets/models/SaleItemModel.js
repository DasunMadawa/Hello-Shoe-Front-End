export class SaleItemModel {
    constructor(
        iCode,
        tags,
        description,
        availableSizeList,
        availableColourList,
        saleItemQtyHolderDTOList,
        saleItemImageHolderDTOList,
        price
    ) {
        this.iCode = iCode;
        this.category = tags;
        this.description = description;
        this.availableSizeList = availableSizeList;
        this.availableColourList = availableColourList;
        this.saleItemQtyHolderDTOList = saleItemQtyHolderDTOList;
        this.saleItemImageHolderDTOList = saleItemImageHolderDTOList;
        this.price = price;

    }

}







