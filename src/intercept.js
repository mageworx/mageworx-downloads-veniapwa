/**
 * Custom intercept file for the extension
 * By default you can only use target of @magento/pwa-buildpack.
 *
 * If do want extend @magento/peregrine or @magento/venia-ui
 * you should add them to peerDependencies to your package.json
 */

module.exports = targets => {
    // For extends productFullDetail component in local-intercept
    const { Targetables } = require('@magento/pwa-buildpack');
    const targetables = Targetables.using(targets);
    targetables.setSpecialFeatures('esModules','cssModules');

    // Wrap the useProductFullDetail talon with this extension
    const peregrineTargets = targets.of("@magento/peregrine");
    const talonsTarget = peregrineTargets.talons;

    talonsTarget.tap((talonWrapperConfig) => {
        talonWrapperConfig.ProductFullDetail.useProductFullDetail.wrapWith(
            "@mageworx/downloads-veniapwa"
        );
    });
};
