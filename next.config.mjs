import createMDX from "@next/mdx";
import rehypeSlug from 'rehype-slug';

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const options = {
  mdxOptions: {
    rehypePlugins: [rehypeSlug],
  },
};


const withMDX = createMDX();

export default withMDX(nextConfig);
