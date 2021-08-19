# Mageworx File Downloads & Product Attachments extension for Magento 2 Venia PWA storefront

This add-on integrates [Mageworx File Downloads & Product Attachments extension](https://www.mageworx.com/magento-2-product-attachments.html) using [Mageworx File Downloads & Product Attachments GraphQl extension](https://github.com/mageworx/MageWorx_DownloadsGraphQl)  with [Magento 2 Venia PWA storefront](https://magento.github.io/pwa-studio/venia-pwa-concept/).

# Features

- Display the downloadable files on the products
- Display file icon
- Display file size
- Display downloads count
- Display the files grouped by sections
- Easy to customize

# Installation

1. Create directory `@mageworx/downloads-veniapwa` to the root folder of your project

2. Copy this project to `@mageworx/downloads-veniapwa`

3. Insert this dependency into your project's package.json in the root folder of your project
```
    {
        "dependencies": {
                "@mageworx/downloads-veniapwa": "link:./@mageworx/downloads-veniapwa"
        }
    }
```
Or run `yarn add file:./@mageworx/downloads-veniapwa` in the root folder of your project 

4. Open local-intercept.js in the root folder of your project and put this code into the module.exports _(you can see example of local-intercept.js in @mageworx/downloads-veniapwa/documentation)_

```
    /* MageWorx FileDownloads start */
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
    /* MageWorx FileDownloads end */
```

5. Check that your `local-intercept` has this code before the `module.exports`. If this code is missing you should add it _(you can see example of `local-intercept.js` in `@mageworx/downloads-veniapwa/documentation`)_

`const { Targetables } = require('@magento/pwa-buildpack');`

6. Let's run your project

`yarn watch`

# Customize CSS

You can change CSS in `@mageworx/downloads-veniapwa/src/components/Attachments/Attachments.css`

# Customize default messages

You can change default messages in `@mageworx/downloads-veniapwa/src/components/Attachments/Attachments.js`

```
const defaultValues = {
    block_title: "File Downloads Block Title",
    downloads: "Downloads",
}
```

# Customize (add) icons

You can add icons in `@mageworx/downloads-veniapwa/src/components/Attachments/FileIcon`

Put icon file into `@mageworx/downloads-veniapwa/src/components/Attachments/FileIcon/icons`

Add import directive of this file and add case in `@mageworx/downloads-veniapwa/src/components/Attachments/FileIcon/FileIcon.js`.

**Example:**

```
    import FileVid from './icons/043-file-video.svg';
    ...
    switch (fileType) {
        ...
        case "mp4":
            FileImage = FileVid;
            break;
        case "mov":
            FileImage = FileVid;
            break;
        case "wmv":
            FileImage = FileVid;
            break;
        case "avi":
            FileImage = FileVid;
            break;
        ...
    }
```