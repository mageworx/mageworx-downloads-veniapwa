import useProductAttachments from "../hooks/useProductAttachments";

const wrapUseProductFullDetails = (original) => {
    return function useProductFullDetails(props, ...restArgs) {
        const { product } = props;

        const attachmentsQueryResult = useProductAttachments({
            urlKey: product.url_key
        });

        const { productDetails, ...defaultReturnData } = original(
            props,
            ...restArgs
        );

        return {
            ...defaultReturnData,
            productDetails: {
                ...productDetails,
                mw_attachments: attachmentsQueryResult.mw_attachments
            }
        };
    };
};

export default wrapUseProductFullDetails;
