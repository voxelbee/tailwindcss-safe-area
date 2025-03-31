const plugin = require("tailwindcss/plugin");

function generateVariantUtilities(baseUtilities, variant, generateValue) {
	return Object.entries(baseUtilities).reduce(
		(acc, [selector, propertyValue]) => {
			const className = selector.slice(1);
			acc[`${className}-${variant}`] = (x) =>
				Object.entries(propertyValue).reduce((result, [property, value]) => {
					if (Array.isArray(value)) {
						result[property] = value.map((v) =>
							v === "-webkit-fill-available" ? v : generateValue(v, x),
						);
					} else {
						result[property] = generateValue(value, x);
					}
					return result;
				}, {});
			return acc;
		},
		{},
	);
}

const safeArea = plugin(({ addUtilities, matchUtilities, theme }) => {
    const baseUtilities = {
        ".m-safe": {
            'margin-top': "env(safe-area-inset-top)",
            'margin-right': "env(safe-area-inset-right)",
            'margin-bottom': "env(safe-area-inset-bottom)",
            'margin-left': "env(safe-area-inset-left)",
        },
        ".mx-safe": {
            'margin-right': "env(safe-area-inset-right)",
            'margin-left': "env(safe-area-inset-left)",
        },
        ".my-safe": {
            'margin-top': "env(safe-area-inset-top)",
            'margin-bottom': "env(safe-area-inset-bottom)",
        },
        ".ms-safe": {
            'margin-inline-start': "env(safe-area-inset-left)",
        },
        ".me-safe": {
            'margin-inline-end': "env(safe-area-inset-left)",
        },
        ".mt-safe": {
            'margin-top': "env(safe-area-inset-top)",
        },
        ".mr-safe": {
            'margin-right': "env(safe-area-inset-right)",
        },
        ".mb-safe": {
            'margin-bottom': "env(safe-area-inset-bottom)",
        },
        ".ml-safe": {
            'margin-left': "env(safe-area-inset-left)",
        },
        ".p-safe": {
            'padding-top': "env(safe-area-inset-top)",
            'padding-right': "env(safe-area-inset-right)",
            'padding-bottom': "env(safe-area-inset-bottom)",
            'padding-left': "env(safe-area-inset-left)",
        },
        ".px-safe": {
            'padding-right': "env(safe-area-inset-right)",
            'padding-left': "env(safe-area-inset-left)",
        },
        ".py-safe": {
            'padding-top': "env(safe-area-inset-top)",
            'padding-bottom': "env(safe-area-inset-bottom)",
        },
        ".ps-safe": {
            'padding-inline-start': "env(safe-area-inset-left)",
        },
        ".pe-safe": {
            'padding-inline-end': "env(safe-area-inset-left)",
        },
        ".pt-safe": {
            'padding-top': "env(safe-area-inset-top)",
        },
        ".pr-safe": {
            'padding-right': "env(safe-area-inset-right)",
        },
        ".pb-safe": {
            'padding-bottom': "env(safe-area-inset-bottom)",
        },
        ".pl-safe": {
            'padding-left': "env(safe-area-inset-left)",
        },
        ".scroll-m-safe": {
            'scroll-margin-top': "env(safe-area-inset-top)",
            'scroll-margin-right': "env(safe-area-inset-right)",
            'scroll-margin-bottom': "env(safe-area-inset-bottom)",
            'scroll-margin-left': "env(safe-area-inset-left)",
        },
        ".scroll-mx-safe": {
            'scroll-margin-right': "env(safe-area-inset-right)",
            'scroll-margin-left': "env(safe-area-inset-left)",
        },
        ".scroll-my-safe": {
            'scroll-margin-top': "env(safe-area-inset-top)",
            'scroll-margin-bottom': "env(safe-area-inset-bottom)",
        },
        ".scroll-ms-safe": {
            'scroll-margin-inline-start': "env(safe-area-inset-left)",
        },
        ".scroll-me-safe": {
            'scroll-margin-inline-end': "env(safe-area-inset-left)",
        },
        ".scroll-mt-safe": {
            'scroll-margin-top': "env(safe-area-inset-top)",
        },
        ".scroll-mr-safe": {
            'scroll-margin-right': "env(safe-area-inset-right)",
        },
        ".scroll-mb-safe": {
            'scroll-margin-bottom': "env(safe-area-inset-bottom)",
        },
        ".scroll-ml-safe": {
            'scroll-margin-left': "env(safe-area-inset-left)",
        },
        ".scroll-p-safe": {
            'scroll-padding-top': "env(safe-area-inset-top)",
            'scroll-padding-right': "env(safe-area-inset-right)",
            'scroll-padding-bottom': "env(safe-area-inset-bottom)",
            'scroll-padding-left': "env(safe-area-inset-left)",
        },
        ".scroll-px-safe": {
            'scroll-padding-right': "env(safe-area-inset-right)",
            'scroll-padding-left': "env(safe-area-inset-left)",
        },
        ".scroll-py-safe": {
            'scroll-padding-top': "env(safe-area-inset-top)",
            'scroll-padding-bottom': "env(safe-area-inset-bottom)",
        },
        ".scroll-ps-safe": {
            'scroll-padding-inline-start': "env(safe-area-inset-left)",
        },
        ".scroll-pe-safe": {
            'scroll-padding-inline-end': "env(safe-area-inset-left)",
        },
        ".scroll-pt-safe": {
            'scroll-padding-top': "env(safe-area-inset-top)",
        },
        ".scroll-pr-safe": {
            'scroll-padding-right': "env(safe-area-inset-right)",
        },
        ".scroll-pb-safe": {
            'scroll-padding-bottom': "env(safe-area-inset-bottom)",
        },
        ".scroll-pl-safe": {
            'scroll-padding-left': "env(safe-area-inset-left)",
        },
        ".inset-safe": {
            'top': "env(safe-area-inset-top)",
            'right': "env(safe-area-inset-right)",
            'bottom': "env(safe-area-inset-bottom)",
            'left': "env(safe-area-inset-left)",
        },
        ".inset-x-safe": {
            'right': "env(safe-area-inset-right)",
            'left': "env(safe-area-inset-left)",
        },
        ".inset-y-safe": {
            'top': "env(safe-area-inset-top)",
            'bottom': "env(safe-area-inset-bottom)",
        },
        ".start-safe": {
            'inset-inline-start': "env(safe-area-inset-left)",
        },
        ".end-safe": {
            'inset-inline-end': "env(safe-area-inset-left)",
        },
        ".top-safe": {
            'top': "env(safe-area-inset-top)",
        },
        ".right-safe": {
            'right': "env(safe-area-inset-right)",
        },
        ".bottom-safe": {
            'bottom': "env(safe-area-inset-bottom)",
        },
        ".left-safe": {
            'left': "env(safe-area-inset-left)",
        },
        ".min-h-screen-safe": {
            'min-height': [
                "calc(100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))",
                // "-webkit-fill-available",
            ],
        },
        ".max-h-screen-safe": {
            'max-height': [
                "calc(100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))",
                // "-webkit-fill-available",
            ],
        },
        ".h-screen-safe": {
            'height': [
                "calc(100vh - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))",
                // "-webkit-fill-available",
            ],
        },
    };
    addUtilities(baseUtilities);

    const offsetUtilities = generateVariantUtilities(
        baseUtilities,
        "offset",
        (v, x) => `calc(${v} + ${x})`,
    );
    matchUtilities(offsetUtilities, {
        values: theme("spacing"),
        supportsNegativeValues: true,
    });

    const orUtilities = generateVariantUtilities(
        baseUtilities,
        "or",
        (v, x) => `max(${v}, ${x})`,
    );
    matchUtilities(orUtilities, {
        values: theme("spacing"),
        supportsNegativeValues: true,
    });
});

module.exports = safeArea;
