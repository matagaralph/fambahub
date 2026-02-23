// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "@stylistic/quotes": "off",
    "@stylistic/semi": "off",
    "@stylistic/comma-dangle": "off",
    "@stylistic/member-delimiter-style": "off",
    "@stylistic/operator-linebreak": "off",
    "@stylistic/quote-props": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "vue/attribute-hyphenation": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/max-attributes-per-line": "off",
    "vue/first-attribute-linebreak": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/html-indent": "off",
    "vue/block-tag-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/no-deprecated-slot-attribute": "off",
    "nuxt/nuxt-config-keys-order": "off",
  },
});
