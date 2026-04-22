import { Link, useSearchParams } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import JobListings from '@/components/JobListings';

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const career = searchParams.get('career') || '';
  const searchQuery = career ? `${career} jobs` : undefined;
  const title = career ? `Live Jobs for ${career}` : 'More Live Jobs';
  const description = career
    ? `Browse live opportunities matching ${career}.`
    : 'Browse additional live opportunities from the job market and find the right role for your next career move.';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Live Job Opportunities</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {description}
          </p>
        </div>

        <JobListings resultsPerPage={12} hideMoreLink searchQuery={searchQuery} />

        <div className="mt-10 text-center">
          <Button variant="outline" size="sm" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
