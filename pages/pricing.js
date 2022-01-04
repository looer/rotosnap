import Pricing from '@/components/Pricing';
import { getActiveProductsWithPrices } from '@/utils/supabase-client';
import Layout from '@/components/Layout';

export default function PricingPage({ products }) {
  return <Layout user={session ? session.user : null}>
    <Pricing products={products} />
  </Layout>;
}

export async function getStaticProps() {
  const products = await getActiveProductsWithPrices();

  return {
    props: {
      products
    },
    revalidate: 60
  };
}
