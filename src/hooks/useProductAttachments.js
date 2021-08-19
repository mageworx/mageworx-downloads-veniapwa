import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_PRODUCT_ATTACHMENTS = gql`
  query getProductAttachments($urlKey: String!) {
    products(filter: { url_key: { eq: $urlKey } }) {
      items {
        url_key
        mw_attachments {
                    tab_title
                    block_title
                    is_group_by_section
                    how_to_download_message
                    items {
                      icon_type
                      id
                      name
                      url
                      size_str
                      downloads_number
                      description
                      section_name
                      section_id
                    }
        }
      }
    }
  }
`;
const useProductAttachments = (props) => {
    const { urlKey } = props;

    const { error, loading, data } = useQuery(GET_PRODUCT_ATTACHMENTS, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        variables: {
            urlKey: urlKey
        }
    });

    const mw_attachments = useMemo(() => {
        if (!data) {
            // The product isn't in the cache and we don't have a response from GraphQL yet.
            return null;
        }

        // Note: if a product is out of stock _and_ the backend specifies not to
        // display OOS items, the items array will be empty.

        // Only return the product that we queried for.
        const product = data.products.items.find(
            item => item.url_key === urlKey
        );

        if (!product) {
            return null;
        }
        return product.mw_attachments;
    }, [data, urlKey]);

    return {
        error,
        isLoading: loading,
        mw_attachments
    };
};

export default useProductAttachments;
