import { postAPI, getAPI } from './index';

const CreatePromotionType = data => {
    return postAPI('/api/promotion-types', data);
};

const GetAllPromotionType = () => {
    return getAPI('/api/promotion-types')
};

const CreatePromotionDiscount = data => {
    return postAPI('/api/promotion-discounts', data);
};

const GetAllPromotionDiscount = () => {
    return getAPI('/api/promotion-discounts')
};

const CreatePromotion = data => {
    return postAPI('/api/promotions', data);
};

const GetAllPromotion = () => {
    return getAPI('/api/promotions')
};

export default {
    GetAllPromotion,
    GetAllPromotionType,
    GetAllPromotionDiscount,
    CreatePromotion,
    CreatePromotionType,
    CreatePromotionDiscount
};
