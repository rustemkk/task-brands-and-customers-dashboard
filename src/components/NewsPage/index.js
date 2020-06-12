import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { uniqueId } from 'lodash';
import React from 'react';


const posts = [
  {
    id: uniqueId(),
    header: 'Gemini Eyes Singapore Expansion With New Asia Pacific Managing Director',
    text: `
      The Gemini crypto exchange has set its sights on an expansion into Singapore with the appointment of a Managing Director for the Asia-Pacific region.
      <br/>The Gemini crypto exchange, owned and operated by the Winklevoss’ Twins, has set its sights into a further expansion into the Asian market with the hiring of Jeremy Ng as Managing Director for Asia Pacific. Ng was formerly the CEO of Leonteq Asia.
      <br/>According to the Singapore 2019 Payment Services Act, any exchange operating within the country must have at least one Singaporean citizen or permanent resident serving on its board of directors. The appointment of Ng will now allow Gemini to apply for the license through the official channels.
      <br/>According to the release, Ng will report directly to Gemini’s President Cameron Winklevoss and will be responsible for the overall strategy and team setup in Singapore and Southeast Asia. 
      <br/>"Southeast Asia is an important part of the crypto movement. The Monetary Authority of Singapore has developed thoughtful regulation that is paving the way for further adoption and innovation. We look forward to building a presence in this major Fintech hub and the Asia Pacific region with Jeremy leading the way," said Cameron Winklevoss, President of Gemini.
      <br/><br/><b>Gemini’s Ever-expanding Exchange</b>
      <br/>The Winklevoss twins’ crypto exchange Gemini is the next step in the unbelievable success story of the brothers – who appear to be lightning rods for success and unbelievably good ideas.
      <br/>As made famous by the film, “The Social Network” - brothers Tyler and Cameron Winklevoss came up with the idea for Facebook and enlisted the help of Mark Zuckerberg, who had the technical prowess, to create it.
      <br/>Following a court ruling in the legal battle against Zuckerberg for the rights to Facebook, the brothers were finally awarded a $65 million settlement for their claims. The Winklevoss’ invested $11 million of their settlement into Bitcoin (BTC) in 2013 and became the world’s first crypto billionaires in 2017 when the Bitcoin price began to gain exponentially.
      <br/>Since then the hits have just kept coming as the Winklevoss’ appear to move from one good idea to the next and established the Gemini cryptocurrency exchange in 2014 to empower other individuals through cryptocurrency.
      <br/>With more than 250 employees, Gemini is now ramping up its global footprint. The appointment of Ng for their Asia Pacific expansion is just the latest addition to an incredibly accomplished group of senior leaders who have already joined Gemini, including Julian Sawyer who is heading up Gemini Europe's expansion as well as Noah Perlman as Chief Compliance Officer, David Damato as Chief Security Officer, Sydney Schaub as General Counsel, Jeanine Hightower-Sellitto as Managing Director, Operations and Robert Cornish as Chief Technology Officer.
    `,
    picture: 'https://blockchainstock.blob.core.windows.net/features/80B9C44476C1B953B3198D79A1D5BE72147167872433DB45482D6C284275FE9B.jpg',
  },
  {
    id: uniqueId(),
    header: 'The Algorand Foundation to Integrate Chainalysis KYT for Transaction Monitoring and Compliance',
    text: `
      The Algorand Foundation will be leveraging Chainalysis’ Know Your Transaction (KYT) for transaction monitoring and compliance processes after its integration. 
      <br/>Investigations and due diligence will be enhanced by using Chainalysis KYT for Algorand’s native token, ALGO. The Algorand Foundation is led by Turing award-winner Silvio Micali and a renowned team of cryptographers to build an open-source, public blockchain for an inclusive ecosystem.
      <br/>“Algorand is committed to providing an inclusive, transparent, and secure system for its global users,” said Algorand Foundation’s Chief Operating Officer (COO), Fangfang Chen, in a release shared with Blockchain.News. 
      <br/>“We needed a compliance partner that could not only help us adhere to regulations in Singapore where we are based but also global regulatory best practices. This will enable us to build the best transaction monitoring solution for the Algo token so that we can realize our mission of providing the world’s first open, permissionless, pure proof-of-stake blockchain protocol securely and scalably.”
      <br/>With the integration of the Chainalysis KYT, Algorand is able to monitor large volumes of activity and identify high-risk transactions on an ongoing basis.
      <br/>Chainalysis adds compliance support to track privacy coins Dash and Zcash
      <br/>Chainalysis has recently launched support for two of the most popular privacy coins, Dash and Zcash. Privacy coins are cryptocurrencies with privacy-enhancing features that allow users to gain total anonymity when making blockchain transactions.
      <br/>Although privacy coins are known to be used for illicit purposes, research by the RAND corporation mentioned that 0.2 percent of all the cryptocurrency addresses mentioned on the dark web was either for Dash or Zcash.
      <br/>Although Dash is known for its privacy features, only 9 percent of all Dash transactions make use of mixing transactions related to PrivateSend. This portion of Dash transactions takes up a relatively small and declining percentage of Dash transactions, according to Chainalysis.
    `,
    picture: 'https://blockchainstock.blob.core.windows.net/article/99E61C58AA9E584C3F31C36A07DDB7636DF5687103EEFCCD9977A4D156DA171F.jpg',
  },
]

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '140px',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const NewsPage = () => {

  const s = useStyles();

  return (
    <Container className={s.cardGrid}>
      <Grid container spacing={3}>
        {posts.map(post =>
          <Grid item key={post.id} xs={12}>
            <Card className={s.card}>
              <CardMedia
                className={s.cardMedia}
                image={post.picture}
                title="Image"
              />
              <CardContent className={s.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {post.header}
                </Typography>
                <Typography>
                  <span dangerouslySetInnerHTML={{ __html: post.text }} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default NewsPage;