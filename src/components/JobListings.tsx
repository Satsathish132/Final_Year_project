import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ExternalLink, MapPin, Loader2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdzunaJob {
  title: string;
  company: { display_name: string };
  location: { display_name: string };
  redirect_url: string;
  salary_min?: number;
  salary_max?: number;
  description: string;
}

const ADZUNA_APP_ID = '0bc48e50';
const ADZUNA_APP_KEY = '0c9564d8b4e3cb94ebd9a6d33a8fdec8';

interface JobListingsProps {
  resultsPerPage?: number;
  hideMoreLink?: boolean;
  searchQuery?: string;
}

const JobListings = ({ resultsPerPage = 6, hideMoreLink = false, searchQuery }: JobListingsProps) => {
  const [jobs, setJobs] = useState<AdzunaJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const effectiveQuery = searchQuery?.trim() || 'software engineer developer data scientist';
    const encodedQuery = encodeURIComponent(effectiveQuery);
    fetch(
      `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&what=${encodedQuery}&results_per_page=${resultsPerPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.results || []);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [resultsPerPage]);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Live Job Market</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trending Job Opportunities
          </h2>
          <p className="text-lg text-muted-foreground">
            Real-time job listings from the market to help you stay ahead in your career journey.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-muted-foreground">
            Unable to load job listings right now. Please try again later.
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {job.company.display_name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{job.location.display_name}</span>
                </div>

                {(job.salary_min || job.salary_max) && (
                  <p className="text-sm font-medium text-accent mb-4">
                    {job.salary_min && job.salary_max
                      ? `₹${job.salary_min.toLocaleString()} - ₹${job.salary_max.toLocaleString()}`
                      : job.salary_min
                        ? `From ₹${job.salary_min.toLocaleString()}`
                        : `Up to ₹${job.salary_max?.toLocaleString()}`}
                  </p>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  asChild
                >
                  <a href={job.redirect_url} target="_blank" rel="noopener noreferrer">
                    View Details
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
          {!hideMoreLink && !loading && !error && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline" size="sm" asChild>
                <Link to="/jobs">More Live Jobs</Link>
              </Button>
            </div>
          )}
          </>
        )}
      </div>
    </section>
  );
};

export default JobListings;
