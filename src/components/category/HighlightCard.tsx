import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HighlightCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Highlight</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Highlight content here</p>
      </CardContent>
    </Card>
  );
};

export default HighlightCard;
