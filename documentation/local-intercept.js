const { Targetables } = require('@magento/pwa-buildpack');

function localIntercept(targets) {
    /* MageWorx downloads veniapwa start */
    const fileDownloadsTargetables = Targetables.using(targets);
    const ProductDetails = fileDownloadsTargetables.reactComponent(
        '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
    );
    const Attachments = ProductDetails.addImport(
        "{Attachments} from '../../../../../../@mageworx/downloads-veniapwa/src/components/Attachments'"
    );
    ProductDetails.insertAfterJSX(
        '<section className={classes.description} />',
        `<${Attachments} attachmentsData={productDetails.mw_attachments} propClasses={classes} />`
    );
    /* MageWorx downloads veniapwa end */
}

module.exports = localIntercept;

