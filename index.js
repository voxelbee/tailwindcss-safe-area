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
            'margin-top': "var(--safe-area-inset-top)",
            'margin-right': "var(--safe-area-inset-right)",
            'margin-bottom': "var(--safe-area-inset-bottom)",
            'margin-left': "var(--safe-area-inset-left)",
        },
        ".mx-safe": {
            'margin-right': "var(--safe-area-inset-right)",
            'margin-left': "var(--safe-area-inset-left)",
        },
        ".my-safe": {
            'margin-top': "var(--safe-area-inset-top)",
            'margin-bottom': "var(--safe-area-inset-bottom)",
        },
        ".ms-safe": {
            'margin-inline-start': "var(--safe-area-inset-left)",
        },
        ".me-safe": {
            'margin-inline-end': "var(--safe-area-inset-left)",
        },
        ".mt-safe": {
            'margin-top': "var(--safe-area-inset-top)",
        },
        ".mr-safe": {
            'margin-right': "var(--safe-area-inset-right)",
        },
        ".mb-safe": {
            'margin-bottom': "var(--safe-area-inset-bottom)",
        },
        ".ml-safe": {
            'margin-left': "var(--safe-area-inset-left)",
        },
        ".p-safe": {
            'padding-top': "var(--safe-area-inset-top)",
            'padding-right': "var(--safe-area-inset-right)",
            'padding-bottom': "var(--safe-area-inset-bottom)",
            'padding-left': "var(--safe-area-inset-left)",
        },
        ".px-safe": {
            'padding-right': "var(--safe-area-inset-right)",
            'padding-left': "var(--safe-area-inset-left)",
        },
        ".py-safe": {
            'padding-top': "var(--safe-area-inset-top)",
            'padding-bottom': "var(--safe-area-inset-bottom)",
        },
        ".ps-safe": {
            'padding-inline-start': "var(--safe-area-inset-left)",
        },
        ".pe-safe": {
            'padding-inline-end': "var(--safe-area-inset-left)",
        },
        ".pt-safe": {
            'padding-top': "var(--safe-area-inset-top)",
        },
        ".pr-safe": {
            'padding-right': "var(--safe-area-inset-right)",
        },
        ".pb-safe": {
            'padding-bottom': "var(--safe-area-inset-bottom)",
        },
        ".pl-safe": {
            'padding-left': "var(--safe-area-inset-left)",
        },
        ".scroll-m-safe": {
            'scroll-margin-top': "var(--safe-area-inset-top)",
            'scroll-margin-right': "var(--safe-area-inset-right)",
            'scroll-margin-bottom': "var(--safe-area-inset-bottom)",
            'scroll-margin-left': "var(--safe-area-inset-left)",
        },
        ".scroll-mx-safe": {
            'scroll-margin-right': "var(--safe-area-inset-right)",
            'scroll-margin-left': "var(--safe-area-inset-left)",
        },
        ".scroll-my-safe": {
            'scroll-margin-top': "var(--safe-area-inset-top)",
            'scroll-margin-bottom': "var(--safe-area-inset-bottom)",
        },
        ".scroll-ms-safe": {
            'scroll-margin-inline-start': "var(--safe-area-inset-left)",
        },
        ".scroll-me-safe": {
            'scroll-margin-inline-end': "var(--safe-area-inset-left)",
        },
        ".scroll-mt-safe": {
            'scroll-margin-top': "var(--safe-area-inset-top)",
        },
        ".scroll-mr-safe": {
            'scroll-margin-right': "var(--safe-area-inset-right)",
        },
        ".scroll-mb-safe": {
            'scroll-margin-bottom': "var(--safe-area-inset-bottom)",
        },
        ".scroll-ml-safe": {
            'scroll-margin-left': "var(--safe-area-inset-left)",
        },
        ".scroll-p-safe": {
            'scroll-padding-top': "var(--safe-area-inset-top)",
            'scroll-padding-right': "var(--safe-area-inset-right)",
            'scroll-padding-bottom': "var(--safe-area-inset-bottom)",
            'scroll-padding-left': "var(--safe-area-inset-left)",
        },
        ".scroll-px-safe": {
            'scroll-padding-right': "var(--safe-area-inset-right)",
            'scroll-padding-left': "var(--safe-area-inset-left)",
        },
        ".scroll-py-safe": {
            'scroll-padding-top': "var(--safe-area-inset-top)",
            'scroll-padding-bottom': "var(--safe-area-inset-bottom)",
        },
        ".scroll-ps-safe": {
            'scroll-padding-inline-start': "var(--safe-area-inset-left)",
        },
        ".scroll-pe-safe": {
            'scroll-padding-inline-end': "var(--safe-area-inset-left)",
        },
        ".scroll-pt-safe": {
            'scroll-padding-top': "var(--safe-area-inset-top)",
        },
        ".scroll-pr-safe": {
            'scroll-padding-right': "var(--safe-area-inset-right)",
        },
        ".scroll-pb-safe": {
            'scroll-padding-bottom': "var(--safe-area-inset-bottom)",
        },
        ".scroll-pl-safe": {
            'scroll-padding-left': "var(--safe-area-inset-left)",
        },
        ".inset-safe": {
            'top': "var(--safe-area-inset-top)",
            'right': "var(--safe-area-inset-right)",
            'bottom': "var(--safe-area-inset-bottom)",
            'left': "var(--safe-area-inset-left)",
        },
        ".inset-x-safe": {
            'right': "var(--safe-area-inset-right)",
            'left': "var(--safe-area-inset-left)",
        },
        ".inset-y-safe": {
            'top': "var(--safe-area-inset-top)",
            'bottom': "var(--safe-area-inset-bottom)",
        },
        ".start-safe": {
            'inset-inline-start': "var(--safe-area-inset-left)",
        },
        ".end-safe": {
            'inset-inline-end': "var(--safe-area-inset-left)",
        },
        ".top-safe": {
            'top': "var(--safe-area-inset-top)",
        },
        ".right-safe": {
            'right': "var(--safe-area-inset-right)",
        },
        ".bottom-safe": {
            'bottom': "var(--safe-area-inset-bottom)",
        },
        ".left-safe": {
            'left': "var(--safe-area-inset-left)",
        },
        ".min-h-screen-safe": {
            'min-height': [
                "calc(100vh - (var(--safe-area-inset-top) + var(--safe-area-inset-bottom)))",
                // "-webkit-fill-available",
            ],
        },
        ".max-h-screen-safe": {
            'max-height': [
                "calc(100vh - (var(--safe-area-inset-top) + var(--safe-area-inset-bottom)))",
                // "-webkit-fill-available",
            ],
        },
        ".h-screen-safe": {
            'height': [
                "calc(100vh - (var(--safe-area-inset-top) + var(--safe-area-inset-bottom)))",
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
