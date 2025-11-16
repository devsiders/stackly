import { DevKit } from "../types/devKits";

export const devKits: DevKit[] = [
  {
    id: '1',
    name: 'Bootstrap',
    description: 'Framework CSS popular para construir interfaces responsive y modernas',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png',
    url: 'https://getbootstrap.com',
    category: 'libraries',
    tags: ['css', 'responsive', 'framework']
  },
  {
    id: '2',
    name: 'Bulma',
    description: 'Framework CSS moderno basado en Flexbox.',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://bulma.io/assets/brand/Bulma%20Icon.png',
    url: 'https://bulma.io',
    github: 'https://github.com/jgthms/bulma',
    category: 'libraries',
    tags: ['css', 'flexbox', 'responsive', 'framework']
  },
  {
    id: '3',
    name: 'Foundation',
    description: 'Framework responsive avanzado para construir sitios web y correos HTML.',
    // No tiene logo en tu JSON original
    url: 'https://get.foundation',
    github: 'https://github.com/foundation/foundation-sites',
    category: 'libraries',
    tags: ['css', 'responsive', 'framework']
  },
  {
    id: '4',
    name: 'Materialize',
    description: 'Framework CSS basado en Material Design de Google.',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://materializecss.com/res/materialize.svg',
    url: 'https://materializecss.com',
    github: 'https://github.com/Dogfalo/materialize',
    category: 'libraries',
    tags: ['css', 'material-design', 'responsive', 'framework']
  },
  {
    id: '5',
    name: 'Semantic UI',
    description: 'Framework CSS basado en clases legibles y semánticas para construir interfaces elegantes.',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://semantic-ui.com/images/logo.png',
    url: 'https://semantic-ui.com',
    github: 'https://github.com/Semantic-Org/Semantic-UI',
    category: 'libraries',
    tags: ['css', 'semantic', 'responsive', 'framework']
  },
  {
    id: '6',
    name: 'Skeleton',
    description: 'Un micro framework CSS para sitios web responsive y rápidos.',
    url: 'http://getskeleton.com',
    github: 'https://github.com/dhg/Skeleton',
    category: 'libraries',
    tags: ['css', 'lightweight', 'responsive', 'framework']
  },
  {
    id: '7',
    name: 'Tailwind CSS',
    description: 'Framework CSS utility-first para desarrollo rápido',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
    url: 'https://tailwindcss.com',
    category: 'libraries',
    tags: ['css', 'utility', 'responsive', 'framework']
  },
  {
    id: '8',
    name: 'Flowbite',
    description: 'Componentes UI construidos con Tailwind CSS para sitios web rápidos y modernos',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://flowbite.com/images/logo.svg',
    url: 'https://flowbite.com',
    category: 'libraries',
    tags: ['tailwind', 'ui', 'components', 'framework']
  },
  {
    id: '9',
    name: 'StencilJS',
    description: 'Librería para crear componentes web reutilizables con estándares modernos',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://stenciljs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.ee275b6c.png&w=96&q=75',
    url: 'https://stenciljs.com',
    category: 'libraries',
    tags: ['components', 'framework', 'ui']
  },
  {
    id: '10',
    name: 'Figcomponents',
    description: 'Colección de componentes reutilizables para Figma para usar en tus diseños.',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://ph-files.imgix.net/4f5e4096-3fcb-42ec-a8fa-bae1a3182350.png?auto=format',
    url: 'https://figcomponents.com/',
    category: 'libraries',
    tags: ['figma', 'ui', 'components']
  },
  {
    id: '11',
    name: 'SpoilerJS',
    description: 'Colección de componentes web agnóstico que permite crear efectos de spoiler con animaciones, compatible con React, Vue y más.',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://spoilerjs.sh4jid.me/favicon.ico',
    url: 'https://spoilerjs.sh4jid.me/',
    github: 'https://github.com/shajidhasan/spoilerjs',
    category: 'libraries',
    tags: ['components', 'ui', 'animation']
  },
  {
    id: '12',
    name: 'Radix UI',
    description: 'Componentes accesibles y sin estilo para React.',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://avatars.githubusercontent.com/u/75042455?s=280&v=4',
    url: 'https://www.radix-ui.com/',
    github: 'https://github.com/radix-ui/themes',
    category: 'libraries',
    tags: ['ui', 'components', 'react']
  },
  {
    id: '13',
    name: 'Motion',
    description: 'Librería de animaciones para JavaScript, React y Vue.',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://framerusercontent.com/images/3aQX5dnH5Yqgsn98QXKF2ZXxIE.png',
    url: 'https://www.motion.dev/',
    category: 'libraries',
    tags: ['animation', 'react', 'vue']
  },
  {
    id: '14',
    name: 'Chakra UI',
    description: 'Librería moderna y accesible de componentes React.',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://chakra-ui.com/favicon.ico',
    url: 'https://chakra-ui.com/',
    github: 'https://github.com/chakra-ui/chakra-ui',
    category: 'libraries',
    tags: ['ui', 'components', 'react']
  },
  {
    id: '15',
    name: 'Shadcn/UI',
    description: 'Colección de componentes preconstruidos con Tailwind y Radix.',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://ui.shadcn.com/favicon.ico',
    url: 'https://ui.shadcn.com/',
    github: 'https://github.com/shadcn-ui/ui',
    category: 'libraries',
    tags: ['ui', 'tailwind', 'react']
  },
  {
    id: '16',
    name: 'Mantine',
    description: 'Componentes React con soporte para temas y dark mode.',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://mantine.dev/favicon.svg',
    url: 'https://mantine.dev/',
    github: 'https://github.com/mantinedev/mantine',
    category: 'libraries',
    tags: ['ui', 'react', 'theme']
  },
  {
    id: '17',
    name: 'VueUse',
    description: 'Colección de utilidades reactivas para Vue 3.',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://vueuse.org/favicon.svg',
    url: 'https://vueuse.org/',
    github: 'https://github.com/vueuse/vueuse',
    category: 'libraries',
    tags: ['vue', 'utilities', 'composition-api']
  },
  {
    id: '18',
    name: 'Recharts',
    description: 'Librería de gráficos para React basada en D3.',
    url: 'https://recharts.org/',
    github: 'https://github.com/recharts/recharts',
    category: 'libraries',
    tags: ['charts', 'data', 'react']
  },
  {
    id: '19',
    name: 'Three.js',
    description: 'Motor 3D para la web basado en WebGL.',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://threejs.org/files/favicon.ico',
    url: 'https://threejs.org/',
    github: 'https://github.com/mrdoob/three.js/',
    category: 'libraries',
    tags: ['3d', 'graphics', 'webgl']
  },
  {
    id: '20',
    name: 'GSAP',
    description: 'Librería para animaciones web rápidas.',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://gsap.com/favicon.ico',
    url: 'https://gsap.com/',
    category: 'libraries',
    tags: ['animation', 'javascript', 'motion']
  },
  {
    id: '21',
    name: 'React Hook Form',
    description: 'Líbreria de manejo de formularios en React con validación.',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://avatars.githubusercontent.com/u/53986236?s=280&v=4',
    url: 'https://react-hook-form.com/',
    github: 'https://github.com/react-hook-form/react-hook-form',
    category: 'libraries',
    tags: ['forms', 'react', 'validation']
  },
  {
    id: '22',
    name: 'TanStack Query',
    description: 'Líbreria para manejo avanzado de estado del servidor y caché para React, Vue y Svelte.',
    logo: 'https://res.cloudinary.com/daxzhb62n/image/fetch/f_auto,q_auto,w_100/https://tanstack.com/favicon.ico',
    url: 'https://tanstack.com/query/latest',
    github: 'https://github.com/tanstack/query',
    category: 'libraries',
    tags: ['react', 'data-fetching', 'state']
  },
  {
    id: '23',
    name: 'Zustand',
    description: 'Líbreria ligera y rápida para manejo de estado en React.',
    logo: 'https://zustand-demo.pmnd.rs/favicon.ico',
    url: 'https://zustand-demo.pmnd.rs/',
    github: 'https://github.com/pmndrs/zustand',
    category: 'libraries',
    tags: ['state', 'react', 'store']
  }






];
