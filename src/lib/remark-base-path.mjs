import { visit } from 'unist-util-visit';

export function remarkBasePath() {
  const base = '/3Point-Greentic-Tutorials';

  return (tree) => {
    visit(tree, 'link', (node) => {
      if (node.url && node.url.startsWith('/') && !node.url.startsWith(base)) {
        node.url = base + node.url;
      }
    });
  };
}
