export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const mainNavItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Platform',
    href: '/platform',
  },
  {
    title: 'Docs',
    href: '/docs',
  },
  {
    title: 'Tutorials',
    href: '/tutorials',
  },
];

export const docsNavSections: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/docs/getting-started/introduction',
        description: 'Learn what Greentic is and what it can do',
      },
      {
        title: 'Installation',
        href: '/docs/getting-started/installation',
        description: 'Get Greentic installed on your system',
      },
      {
        title: 'Quickstart',
        href: '/docs/getting-started/quickstart',
        description: 'Build your first digital worker in minutes',
      },
    ],
  },
  {
    title: 'Architecture',
    items: [
      {
        title: 'Overview',
        href: '/docs/architecture/overview',
        description: 'Understand the Greentic platform architecture',
      },
      {
        title: 'Components',
        href: '/docs/architecture/components',
        description: 'WebAssembly components that execute logic',
      },
      {
        title: 'Flows',
        href: '/docs/architecture/flows',
        description: 'YGTC flow definitions and orchestration',
      },
      {
        title: 'Packs',
        href: '/docs/architecture/packs',
        description: 'Bundled, signed packages for distribution',
      },
      {
        title: 'Multi-tenancy',
        href: '/docs/architecture/multi-tenancy',
        description: 'Tenant isolation and identity',
      },
      {
        title: 'Security',
        href: '/docs/architecture/security',
        description: 'Security model and best practices',
      },
    ],
  },
  {
    title: 'Events',
    items: [
      {
        title: 'Overview',
        href: '/docs/events/overview',
        description: 'Multi-tenant event fabric for Greentic',
      },
      {
        title: 'Providers',
        href: '/docs/events/providers',
        description: 'Webhook, timer, email, and SMS triggers',
      },
    ],
  },
  {
    title: 'Messaging',
    items: [
      {
        title: 'Overview',
        href: '/docs/messaging/overview',
        description: 'Multi-channel messaging platform',
      },
      {
        title: 'Microsoft Teams',
        href: '/docs/messaging/teams',
        description: 'Teams bot integration',
      },
      {
        title: 'Slack',
        href: '/docs/messaging/slack',
        description: 'Slack app integration',
      },
      {
        title: 'WhatsApp',
        href: '/docs/messaging/whatsapp',
        description: 'WhatsApp Business API',
      },
      {
        title: 'WebChat',
        href: '/docs/messaging/webchat',
        description: 'Embeddable web chat widget',
      },
    ],
  },
  {
    title: 'OAuth',
    items: [
      {
        title: 'Overview',
        href: '/docs/oauth/overview',
        description: 'OAuth broker for third-party API access',
      },
    ],
  },
  {
    title: 'MCP Integration',
    items: [
      {
        title: 'Overview',
        href: '/docs/mcp/overview',
        description: 'Model Context Protocol integration',
      },
      {
        title: 'Tools',
        href: '/docs/mcp/tools',
        description: 'Using and creating MCP tools',
      },
      {
        title: 'Integration',
        href: '/docs/mcp/integration',
        description: 'Connecting MCP to flows',
      },
    ],
  },
  {
    title: 'Operations',
    items: [
      {
        title: 'Operator',
        href: '/docs/operations/operator',
        description: 'Local development and demo orchestration',
      },
    ],
  },
  {
    title: 'Reference',
    items: [
      {
        title: 'CLI',
        href: '/docs/reference/cli',
        description: 'Greentic CLI tools reference',
      },
      {
        title: 'YGTC Schema',
        href: '/docs/reference/ygtc-schema',
        description: 'Flow file specification',
      },
      {
        title: 'Component Manifest',
        href: '/docs/reference/component-manifest',
        description: 'Component manifest specification',
      },
      {
        title: 'Telemetry',
        href: '/docs/reference/telemetry',
        description: 'OpenTelemetry configuration',
      },
    ],
  },
];

export const tutorialItems: NavItem[] = [
  {
    title: 'Hello World Echo Bot',
    href: '/tutorials/demo-1-hello-world',
    description: 'Learn the basics of YGTc v2 flows with a simple echo bot',
  },
  {
    title: 'IT Support Assistant',
    href: '/tutorials/demo-2-it-support',
    description: 'Build an intelligent IT support assistant with LLM integration',
  },
  {
    title: 'RAG Knowledge System',
    href: '/tutorials/demo-3-rag-system',
    description: 'Create a full-stack RAG system with Astro and WebChat',
  },
];
