
import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useReportForm } from '@/hooks/useReportForm';

// Import the refactored components
import ReportTypeForm from '@/components/report/ReportTypeForm';
import ItemDetailsForm from '@/components/report/ItemDetailsForm';
import ImageUploadForm from '@/components/report/ImageUploadForm';
import ContactInfoForm from '@/components/report/ContactInfoForm';

const ReportForm = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  // Get the type from URL params or default to 'lost'
  const typeFromParams = searchParams.get('type');
  const initialType = typeFromParams === 'lost' || typeFromParams === 'found'
    ? typeFromParams
    : 'lost';

  const { 
    form, 
    isSubmitting, 
    imagePreview, 
    handleImageChange, 
    onSubmit 
  } = useReportForm(initialType as 'lost' | 'found');

  // Pre-fill contact info if user is logged in
  useEffect(() => {
    if (user) {
      const email = user.email;
      if (email) {
        form.setValue('contactEmail', email);
      }
    }
  }, [user, form]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-echo-gray">
        <div className="echo-container py-8">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-echo-blue hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
            </Link>
          </div>
          
          <Card className="max-w-3xl mx-auto shadow-md">
            <CardHeader className="bg-white rounded-t-lg">
              <CardTitle className="text-2xl">
                Report {form.watch('type') === 'lost' ? 'a Lost' : 'a Found'} Item
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <ReportTypeForm control={form.control} />
                  
                  <ItemDetailsForm control={form.control} />
                  
                  <div className="mt-6">
                    <ImageUploadForm 
                      onImageChange={handleImageChange}
                      imagePreview={imagePreview}
                    />
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <ContactInfoForm control={form.control} />
                  </div>
                  
                  <div className="border-t pt-4 flex justify-end space-x-4">
                    <Button type="button" variant="outline" asChild>
                      <Link to="/">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Report'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportForm;
