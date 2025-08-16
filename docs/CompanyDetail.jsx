import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { 
  Star, 
  MapPin, 
  Zap, 
  Phone, 
  Globe, 
  ArrowLeft, 
  Calendar,
  User,
  Award,
  MessageCircle
} from 'lucide-react';
import ReviewCard from './ReviewCard';
import LeadForm from './LeadForm';
import { mockReviews, mockContent, mockBadges } from '../data/mockData';

const CompanyDetail = ({ company, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const navigate = useNavigate();

  if (!company) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Empresa não encontrada</h2>
          <Button onClick={() => navigate('/')}>
            Voltar para Home
          </Button>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const companyReviews = mockReviews.filter(review => review.companyId === company.id);
  const companyContent = mockContent.filter(content => content.companyId === company.id);
  const companyBadges = mockBadges.filter(badge => badge.companyId === company.id);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="mb-6 flex items-center space-x-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Companies</span>
      </Button>

      {/* Company Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                {renderStars(company.rating)}
                <span className="ml-1 font-medium">{company.rating}</span>
                <span>({company.reviewCount} reviews)</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{company.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4" />
                <span>{company.capacity} MW Capacity</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>{company.phone}</span>
              </div>
              <a 
                href={company.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-orange-600 hover:text-orange-700"
              >
                <Globe className="h-4 w-4" />
                <span>Visit Website</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Dialog open={isLeadFormOpen} onOpenChange={setIsLeadFormOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600 flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Solicitar Orçamento</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <LeadForm 
                  companyName={company.name}
                  onClose={() => setIsLeadFormOpen(false)}
                />
              </DialogContent>
            </Dialog>
            <Button variant="outline">Contact Company</Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({companyReviews.length})</TabsTrigger>
          <TabsTrigger value="guides">Guides ({companyContent.length})</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* About Company */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>About {company.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{company.description}</p>
                </CardContent>
              </Card>
            </div>

            {/* Company Stats */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Company Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Installed Capacity</span>
                    <span className="font-semibold">{company.capacity} MW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Reviews</span>
                    <span className="font-semibold">{company.reviewCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Rating</span>
                    <span className="font-semibold">{company.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {company.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Badges */}
              {companyBadges.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Badges & Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {companyBadges.map((badge) => (
                        <div key={badge.id} className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <div>
                            <div className="font-medium">{badge.name}</div>
                            <div className="text-sm text-gray-600">{badge.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            {companyReviews.length > 0 ? (
              companyReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-600">Be the first to review this company.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="mt-6">
          <div className="space-y-6">
            {companyContent.length > 0 ? (
              companyContent.map((content) => (
                <Card key={content.id}>
                  <CardHeader>
                    <CardTitle>{content.title}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(content.createdAt).toLocaleDateString()}</span>
                      <Badge variant="outline">{content.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{content.body}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No guides available</h3>
                  <p className="text-gray-600">This company hasn't published any guides yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-gray-600">{company.phone}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">Website</div>
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700"
                  >
                    {company.website}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-gray-600">{company.location}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyDetail;

