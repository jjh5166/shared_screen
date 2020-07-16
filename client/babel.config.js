module.exports = api => {
  const isTest = api.env('test');
  api.cache(true);
  return {
    presets: isTest ? [
      '@babel/preset-react',
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 2 versions'],
          },
          modules: isTest ? 'commonjs' : false,
        },
      ],
    ] : ["next/babel"],
    plugins: [
      [
        "styled-components",
        {
          "ssr": true
        }
      ]
    ]
  };
};