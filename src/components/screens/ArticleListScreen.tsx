import React, { useCallback } from 'react';
import { ScrollView, Button, Platform } from 'react-native';

import RNBelliOS from '../../native/ios/RNBelliOS.js';
import RNBellAndroid from '../../native/android/RNBellAndroid.js';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Screens } from '../../navigation/screens';

const Bell = Platform.select({
  ios: RNBelliOS,
  android: RNBellAndroid,
});

const ArticleListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isFocused = useIsFocused();

  if (!isFocused) {
    return null;
  }

  return (
    <ScrollView>
      <Button
        title="Article 1.."
        onPress={() => navigation.navigate(Screens.Article, article)}
      />
    </ScrollView>
  );
};

export const article = {
  _id: 'N7UUFKWKSRAKFCDRWPXYNIQENE',
  authorId: '00000000-0000-4000-8000-0943f05c5deb',
  syndicationKey:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJjYW5vbmljYWxfc2l0ZV91dWlkIjoiMDAwMDAwMDAtMDAwMC00MDAwLTgwMDAtNGFkYzc4ODlmNjMzIiwiY29udGFpbmVyX2lkIjoiTjdVVUZLV0tTUkFLRkNEUldQWFlOSVFFTkUiLCJpYXQiOjE3NTAwOTYzODN9.pSmFCO0EOkN06BmyBo77cziv-wXb3PFggse8dF0LRyr9JIHpzgWS7n1tNWH7jr3QyfaPPkXO3gxCkKXLYqWugFPQ1AjxduUMbULvxkZ2bCMClzRJcdiv5a39AfL-hDl9U3dzS7SFCb1ahXGOkBvxW4ZhoC4nrydzliTTvUQi3Ag',
  title: 'Une piste cyclable sur les cendres d’un projet d’autoroute',
  caption: "Visuels d'aménagement du corridor lorettain",
  subtitle:
    'Le Corridor lorettain aurait jadis pu être transformé en une autoroute. Mais le milieu naturel a gardé sa vocation et se verra bientôt bonifié d’une piste cyclable pour faire le «trait d’union» avec le réseau de la Ville de Québec.',
  path: 'https://www.lesoleil.com/actualites/actualites-locales/la-capitale/2025/06/16/une-piste-cyclable-sur-les-cendres-dun-projet-dautoroute-N7UUFKWKSRAKFCDRWPXYNIQENE/',
  image:
    '/resizer/v2/W2X3EDI3YNAJVG7AQOWTLLJPX4.jpg?auth=7cd329ba69eaaebfeb1b593df1fbcf4b0c8bf6468537798f62424d8669cf2938',
  thumbnail:
    'https://www.lesoleil.com/resizer/v2/W2X3EDI3YNAJVG7AQOWTLLJPX4.jpg?auth=7cd329ba69eaaebfeb1b593df1fbcf4b0c8bf6468537798f62424d8669cf2938&width=300',
  imageCredits: "Ville de L'Ancienne-Lorette",
  images: {
    originalImage:
      'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/W2X3EDI3YNAJVG7AQOWTLLJPX4.jpg?smart=true&auth=7cd329ba69eaaebfeb1b593df1fbcf4b0c8bf6468537798f62424d8669cf2938',
    sizes: {
      nano: 'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/W2X3EDI3YNAJVG7AQOWTLLJPX4.jpg?smart=true&auth=7cd329ba69eaaebfeb1b593df1fbcf4b0c8bf6468537798f62424d8669cf2938&width=158',
      tiny: 'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/W2X3EDI3YNAJVG7AQOWTLLJPX4.jpg?smart=true&auth=7cd329ba69eaaebfeb1b593df1fbcf4b0c8bf6468537798f62424d8669cf2938&width=400',
      small:
        'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/W2X3EDI3YNAJVG7AQOWTLLJPX4.jpg?smart=true&auth=7cd329ba69eaaebfeb1b593df1fbcf4b0c8bf6468537798f62424d8669cf2938&width=600',
      medium:
        'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/W2X3EDI3YNAJVG7AQOWTLLJPX4.jpg?smart=true&auth=7cd329ba69eaaebfeb1b593df1fbcf4b0c8bf6468537798f62424d8669cf2938&width=768',
      regular:
        'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/W2X3EDI3YNAJVG7AQOWTLLJPX4.jpg?smart=true&auth=7cd329ba69eaaebfeb1b593df1fbcf4b0c8bf6468537798f62424d8669cf2938&width=1024',
      big: 'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/W2X3EDI3YNAJVG7AQOWTLLJPX4.jpg?smart=true&auth=7cd329ba69eaaebfeb1b593df1fbcf4b0c8bf6468537798f62424d8669cf2938&width=1440',
      focal:
        'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/W2X3EDI3YNAJVG7AQOWTLLJPX4.jpg?smart=true&auth=7cd329ba69eaaebfeb1b593df1fbcf4b0c8bf6468537798f62424d8669cf2938&width=600&height=450',
    },
    height: 2312,
    width: 4032,
  },
  content_elements: [
    {
      _id: 'MUE27Q7DIVG2DDT76TGFOVOL6A',
      type: 'text',
      content:
        '«Le projet d’une autoroute, c’est le projet d’un siècle passé. Maintenant, on est ailleurs. Et une chance que ça a été préservé pour qu’on puisse le développer comme on le fait aujourd’hui», a salué le maire de L’Ancienne-Lorette, lundi, lors de l’annonce du lancement des travaux de son nouveau Corridor lorettain. ',
    },
    {
      _id: 'NXHCN6YE7RDPBEJBGFQ7WKAQSQ',
      type: 'text',
      content:
        'À l’époque conseiller municipal indépendant, Gaétan Pageau avait milité contre la «destruction» des milieux naturels destinés à un potentiel prolongement vers l’ouest de l’autoroute Félix-Leclerc.',
    },
    {
      _id: 'ZTX3SLB6JRGLFAPGFIJZ6EE6EI',
      title: 'À lire aussi',
      items: [
        {
          type: 'interstitial_link',
          content:
            "Prolongement de l'autoroute Félix-Leclerc: la résistance s'organise à L'Ancienne-Lorette\n",
          url: 'https://www.lesoleil.com/2017/09/04/prolongement-de-lautoroute-felix-leclerc-la-resistance-sorganise-a-lancienne-lorette-0d75b65f82c0f57c14807cb44021a786/',
          image:
            'https://cloudfront-us-east-1.images.arcpublishing.com/lescoopsdelinformation/S5GW37TDIJAXVBDPCCA3UIT32U.jpg',
        },
        {
          type: 'interstitial_link',
          content:
            'Prolongement de la 40: Québec s’entête, déplore L’Ancienne-Lorette\n',
          url: 'https://www.lesoleil.com/2018/07/13/prolongement-de-la-40-quebec-sentete-deplore-lancienne-lorette-c055d56945cb5ff29065e16b6d5cda79/',
          image:
            'https://cloudfront-us-east-1.images.arcpublishing.com/lescoopsdelinformation/2P24VIPLVZFKFITVKGPKSNJO5I.jpg',
        },
      ],
      type: 'link_list',
      subtype: 'Liste de liens COOPS',
    },
    {
      _id: 'XSDEI3SK4NDMJG35XHNJIGOVRA',
      type: 'text',
      content:
        'Le projet des années 1960-1970, qui visait la construction d’un tronçon sur 11 km pour relier l’autoroute 40 à Saint-Augustin-de-Desmaures, avait été relancé autour de 2017 par le gouvernement libéral. ',
    },
    {
      _id: 'VFLZ4LI57VD3RJDBK5PO52PLRI',
      type: 'text',
      content:
        'Le gouvernement Legault avait finalement mis fin à l’étude de besoins commandée par les libéraux sur le prolongement de l’autoroute dans le corridor boisé, peu de temps après son élection, en 2019.',
    },
    {
      _id: 'G2YECVIX5ZGCTPPC5E26JRZXCQ',
      type: 'text',
      content:
        'Les terrains boisés détenus par le ministère des Transports qui traversent la ville de L’Ancienne-Lorette ont quelque peu été «laissés à l’abandon dans les 50 dernières années», avant que les sentiers ne soient «revitalisés».',
    },
    {
      _id: 'PL4F2E24MZFOLCWDJJGQ2VZKME',
      type: 'text',
      content:
        '«Est alors venue l’idée d’ajouter une piste cyclable», se souvient le maire Gaétan Pageau. ',
    },
    {
      _id: '2GQDIVK65RBGRPQTN54VAP2D34',
      type: 'header',
      content: '2,5 km de «trait d’union» ',
    },
    {
      _id: 'PVWSNSAGMFCHXCGAK5R4SUNHJI',
      type: 'text',
      content:
        'Forte d’une permission d’occupation renouvelable autorisée par le ministère des Transports, la Ville de L’Ancienne-Lorette met finalement le projet en marche, avec le début des travaux prévu d’ici la fin juin. ',
    },
    {
      _id: 'AYIP3I25GJHG7DT2FMCNMMBAGQ',
      citation: {
        content: '',
        type: 'text',
      },
      content_elements: [
        {
          _id: 'Z4AIBAUTM5CCBN5NKEXQ45SVQQ',
          type: 'text',
          content:
            'Le Corridor lorettain comptera dans une première phase quelque 2,5 km de piste cyclable asphaltée et éclairée de même que 3,2 km de sentiers piétonniers boisés en milieu urbain.',
        },
      ],
      type: 'quote',
      subtype: 'blockquote',
    },
    {
      _id: 'ZXCGSIHTBBDZPLPLMP2BPIOVDM',
      type: 'text',
      content:
        '«Un projet de mobilité active très important pour l’ensemble de l’agglomération de Québec», s’est félicité le maire Pageau, saluant la contribution à l’idée initiale du député caquiste de La Peltrie, Éric Caire. ',
    },
    {
      _id: '2MUI7W5O3RGELLBQDVPMBJNSEM',
      type: 'text',
      content:
        '«Une piste cyclable, pour moi, ça s’imposait. C’est une plus-value pour les citoyens, ça va contribuer à notre qualité de vie et ça va mettre en valeur un site qui a besoin d’être mis en valeur», a d’ailleurs commenté ce dernier en conférence de presse, insistant pour le maintien de ce milieu naturel. ',
    },
    {
      _id: '4HEZQ3VQPBEULGZG27QYGT4GYI',
      caption: "Visuels d'aménagement du Corridor lorettain",
      image:
        '/resizer/v2/4HEZQ3VQPBEULGZG27QYGT4GYI.jpg?auth=63debccebd65dce24931e62b09ea2f4900b7b2548b31a495c648a69ce610bacd',
      thumbnail:
        '/resizer/v2/4HEZQ3VQPBEULGZG27QYGT4GYI.jpg?auth=63debccebd65dce24931e62b09ea2f4900b7b2548b31a495c648a69ce610bacd&width=300',
      imageType: 'illustration',
      images: {
        originalImage:
          'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/4HEZQ3VQPBEULGZG27QYGT4GYI.jpg?smart=true&auth=63debccebd65dce24931e62b09ea2f4900b7b2548b31a495c648a69ce610bacd',
        sizes: {
          nano: 'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/4HEZQ3VQPBEULGZG27QYGT4GYI.jpg?smart=true&auth=63debccebd65dce24931e62b09ea2f4900b7b2548b31a495c648a69ce610bacd&width=158',
          tiny: 'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/4HEZQ3VQPBEULGZG27QYGT4GYI.jpg?smart=true&auth=63debccebd65dce24931e62b09ea2f4900b7b2548b31a495c648a69ce610bacd&width=400',
          small:
            'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/4HEZQ3VQPBEULGZG27QYGT4GYI.jpg?smart=true&auth=63debccebd65dce24931e62b09ea2f4900b7b2548b31a495c648a69ce610bacd&width=600',
          medium:
            'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/4HEZQ3VQPBEULGZG27QYGT4GYI.jpg?smart=true&auth=63debccebd65dce24931e62b09ea2f4900b7b2548b31a495c648a69ce610bacd&width=768',
          regular:
            'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/4HEZQ3VQPBEULGZG27QYGT4GYI.jpg?smart=true&auth=63debccebd65dce24931e62b09ea2f4900b7b2548b31a495c648a69ce610bacd&width=1024',
          big: 'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/4HEZQ3VQPBEULGZG27QYGT4GYI.jpg?smart=true&auth=63debccebd65dce24931e62b09ea2f4900b7b2548b31a495c648a69ce610bacd&width=1440',
          focal:
            'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/4HEZQ3VQPBEULGZG27QYGT4GYI.jpg?smart=true&auth=63debccebd65dce24931e62b09ea2f4900b7b2548b31a495c648a69ce610bacd&width=600&height=450',
        },
        height: 2272,
        width: 4032,
      },
      type: 'image',
      url: 'https://cloudfront-us-east-1.images.arcpublishing.com/lescoopsdelinformation/4HEZQ3VQPBEULGZG27QYGT4GYI.jpg',
      author: {},
      authorsInline: "Ville de L'Ancienne-Lorette",
    },
    {
      _id: '4AQ7V3TWKZEMLG4I2NJIV2PLXM',
      type: 'text',
      content:
        'Les travaux de construction de la première phase entre la route de l’Aéroport et l’autoroute Henri-IV, chiffrée à 6,4 millions, s’échelonneront jusqu’à l’automne 2025. ',
    },
    {
      _id: 'A6YFW2JDJ5EDBMKJRGEZGW7J6U',
      type: 'text',
      content:
        'Le maire de L’Ancienne-Lorette projette déjà que le Corridor loterrain reliera l’aéroport international Jean-Lesage, une fois les travaux de réfection de cette artère complétés. Gaétan Pageau rêve même de le prolonger jusqu’à Saint-Augustin-de-Desmaures, pour créer «une boucle» complète avec le réseau cyclable de la Ville de Québec.',
    },
    {
      _id: 'QNLXZZLLUNFUDHKPURNADA7KJA',
      caption:
        'La piste cyclable pavée et le sentier piétonnier en gravier seront aménagés côte-à-côte.',
      image:
        '/resizer/v2/QNLXZZLLUNFUDHKPURNADA7KJA.jpg?auth=248a5f054da6d64cfa1ad423f44b983c1de3c87ba1c226454c098f07842d3bec',
      thumbnail:
        '/resizer/v2/QNLXZZLLUNFUDHKPURNADA7KJA.jpg?auth=248a5f054da6d64cfa1ad423f44b983c1de3c87ba1c226454c098f07842d3bec&width=300',
      imageType: 'illustration',
      images: {
        originalImage:
          'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/QNLXZZLLUNFUDHKPURNADA7KJA.jpg?smart=true&auth=248a5f054da6d64cfa1ad423f44b983c1de3c87ba1c226454c098f07842d3bec',
        sizes: {
          nano: 'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/QNLXZZLLUNFUDHKPURNADA7KJA.jpg?smart=true&auth=248a5f054da6d64cfa1ad423f44b983c1de3c87ba1c226454c098f07842d3bec&width=158',
          tiny: 'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/QNLXZZLLUNFUDHKPURNADA7KJA.jpg?smart=true&auth=248a5f054da6d64cfa1ad423f44b983c1de3c87ba1c226454c098f07842d3bec&width=400',
          small:
            'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/QNLXZZLLUNFUDHKPURNADA7KJA.jpg?smart=true&auth=248a5f054da6d64cfa1ad423f44b983c1de3c87ba1c226454c098f07842d3bec&width=600',
          medium:
            'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/QNLXZZLLUNFUDHKPURNADA7KJA.jpg?smart=true&auth=248a5f054da6d64cfa1ad423f44b983c1de3c87ba1c226454c098f07842d3bec&width=768',
          regular:
            'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/QNLXZZLLUNFUDHKPURNADA7KJA.jpg?smart=true&auth=248a5f054da6d64cfa1ad423f44b983c1de3c87ba1c226454c098f07842d3bec&width=1024',
          big: 'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/QNLXZZLLUNFUDHKPURNADA7KJA.jpg?smart=true&auth=248a5f054da6d64cfa1ad423f44b983c1de3c87ba1c226454c098f07842d3bec&width=1440',
          focal:
            'https://lescoopsdelinformation-le-soleil-prod.web.arc-cdn.net/resizer/v2/QNLXZZLLUNFUDHKPURNADA7KJA.jpg?smart=true&auth=248a5f054da6d64cfa1ad423f44b983c1de3c87ba1c226454c098f07842d3bec&width=600&height=450',
        },
        height: 2320,
        width: 4032,
      },
      type: 'image',
      url: 'https://cloudfront-us-east-1.images.arcpublishing.com/lescoopsdelinformation/QNLXZZLLUNFUDHKPURNADA7KJA.jpg',
      author: {},
      authorsInline: "Ville de L'Ancienne-Lorette",
    },
    {
      _id: 'GAEVWYWRJVAG3D2IZAAOFOSULQ',
      type: 'text',
      content:
        '«Notre vision, pour les prochaines phases, c’est de mettre encore davantage en valeur le cadre du boisé lorettain dont la rivière Lorette en ajoutant des belvédères et des aires de repos et relier l’aéroport et le corridor du Littoral, à terme», détaille-t-il. ',
    },
    {
      _id: '2XUJE3PZZREMNDWR4TBVWBLJZA',
      type: 'header',
      content: '«Une première historique»',
    },
    {
      _id: 'JPJ6W4GDMJDIVEDI2BRIULPXUU',
      type: 'text',
      content:
        'L’<a href="https://www.lesoleil.com/actualites/actualites-locales/la-capitale/2025/06/02/a-lagglo-on-arrete-de-se-chicaner-V4HR327CTZE6VEKFNZBEJDSZFY/" target="_blank" rel="" title="https://www.lesoleil.com/actualites/actualites-locales/la-capitale/2025/06/02/a-lagglo-on-arrete-de-se-chicaner-V4HR327CTZE6VEKFNZBEJDSZFY/">amélioration des relations entre la Ville de Québec et la Ville de L’Ancienne-Lorette</a> permettra par ailleurs à cette dernière de piloter le projet qui se déploiera sur son territoire. ',
    },
    {
      _id: 'A4L4QDBLYZEW3DH7XOZ3RXRRVI',
      citation: {
        content: '',
        type: 'text',
      },
      content_elements: [
        {
          _id: 'I3MLFBBBGFFADDUXOG7MNS3YTU',
          type: 'text',
          content:
            'Il s’agit de la première fois dans l’histoire de l’agglomération que la réalisation d’un projet d’agglomération est confiée à une ville liée, ont souligné les partenaires. ',
        },
      ],
      type: 'quote',
      subtype: 'blockquote',
    },
    {
      _id: 'T6N7U3BUJRDCZKZS7ERM4IKIDI',
      type: 'text',
      content:
        '«On est dans l’exécution de quelque chose de grand, quelque chose qui permet enfin de se développer en agglomération», a déclaré le vice-président du comité exécutif de la Ville de Québec, Pierre-Luc Lachance. ',
    },
    {
      _id: 'HK3M2BVCMBHRHN63EBDBLQRQAU',
      type: 'text',
      content:
        'Le Corridor lorettain a été désigné comme équipement d’intérêt collectif de l’agglomération de Québec. ',
    },
  ],
  displayDate: '16 juin 2025',
  publishedDates: {
    fullDateTime: '16 juin 2025 à 13h52',
    publishedDate: {
      dateTime: '16 juin 2025 à 13h52',
      date: '16 juin 2025',
      time: '13h52',
    },
    fullTime: 'Publié à 13h52',
  },
  subsection: '/actualites/actualites-locales/la-capitale',
  sectionSlug: '/actualites/actualites-locales/la-capitale',
  section: 'La Capitale',
  sectionId: '/actualites/actualites-locales/la-capitale',
  paywallType: 'Payant',
  type: 'story',
  subtype: 'article_avec_commentaires',
  website: 'le-soleil',
  author: {
    _id: 'Émilie_Pelletier',
    name: 'Émilie Pelletier',
    image:
      'https://s3.amazonaws.com/arc-authors/lescoopsdelinformation/8c0cec5a-72c6-4bc1-92cd-cfa8ea4dbeff.jpg',
    slug: 'emilie-pelletier',
    description:
      "Journaliste au Soleil depuis 2020, Émilie Pelletier a fait ses premières armes à la santé, en pleine pandémie. Depuis l'élection du maire Bruno Marchand, en novembre 2021, elle couvre la politique municipale et ses enjeux au quotidien.",
  },
  authorsInline: 'Émilie Pelletier',
  credits: [
    {
      _id: 'Émilie_Pelletier',
      originalByline: 'Émilie Pelletier, Le Soleil',
      name: 'Émilie Pelletier',
      image:
        'https://s3.amazonaws.com/arc-authors/lescoopsdelinformation/8c0cec5a-72c6-4bc1-92cd-cfa8ea4dbeff.jpg',
      url: '/auteur/emilie-pelletier/',
      slug: 'emilie-pelletier',
      description:
        "Journaliste au Soleil depuis 2020, Émilie Pelletier a fait ses premières armes à la santé, en pleine pandémie. Depuis l'élection du maire Bruno Marchand, en novembre 2021, elle couvre la politique municipale et ses enjeux au quotidien.",
      social_links: [
        {
          site: 'email',
          url: 'epelletier@lesoleil.com',
        },
        {
          site: 'twitter',
          url: 'EmiPelletier',
        },
        {
          site: 'linkedin',
          url: 'émilie-pelletier-ba25ab149',
        },
        {
          site: 'rss',
          url: '/arc/outboundfeeds/rss-lead/author/Émilie_Pelletier/',
        },
      ],
    },
  ],
  tags: [
    {
      description: 'Politique municipale',
      slug: 'politique-municipale',
      text: 'Politique municipale',
    },
    {
      description: 'Vehicles & Transportation',
      slug: 'transports',
      text: 'Transports',
    },
  ],
  description:
    'Le Corridor lorettain aurait jadis pu être transformé en une autoroute. Mais le milieu naturel a gardé sa vocation et se verra bientôt bonifié d’une piste cyclable pour faire le «trait d’union» avec le réseau de la Ville de Québec.',
  prodLink:
    'https://www.lesoleil.com/actualites/actualites-locales/la-capitale/2025/06/16/une-piste-cyclable-sur-les-cendres-dun-projet-dautoroute-N7UUFKWKSRAKFCDRWPXYNIQENE/',
  paywall: 'Illimites',
  ads: {
    '2': {
      adType: 'custom',
      customDesktopSize: '[[300,250],[515,290],[600,410]]',
      customTabletSize: '[[300,250],[515,290],[600,410]]',
      customMobileSize: '[[300,170],[300,250],[300,600],[320,50]]',
      customReservedSpace: '[1,1]',
      lazyLoad: true,
      displayAdLabel: true,
      reserveSpace: true,
      customKVPs: {
        intext: 'true',
      },
    },
    '4': {
      conversationId: 'N7UUFKWKSRAKFCDRWPXYNIQENE',
      title: 'Exprimez-vous.',
      description:
        'Laissez un commentaire ci-dessous et faites-nous part de votre opinion.',
      minCommentCount: 2,
    },
    '8': {
      adType: 'custom',
      customDesktopSize: '[fluid]',
      customTabletSize: '[fluid]',
      customMobileSize: '[fluid]',
      customReservedSpace: '[1,1]',
      lazyLoad: true,
      displayAdLabel: false,
      reserveSpace: false,
      pbInternal_cloneId: 'f0fXQWzbhxNxdh',
      customKVPs: {
        intext: 'true',
      },
    },
    '12': {
      adType: 'custom',
      customDesktopSize: '[[300,250],[515,290],[600,410]]',
      customTabletSize: '[[300,250],[515,290],[600,410]]',
      customMobileSize: '[[300,170],[300,250],[320,50]]',
      customReservedSpace: '[1,1]',
      lazyLoad: true,
      displayAdLabel: true,
      reserveSpace: true,
      pbInternal_cloneId: 'f0fwNxnjA4hba2D',
      customKVPs: {
        intext: 'true',
      },
    },
    '20': {
      adType: 'custom',
      customDesktopSize: '[[300,250],[515,290],[300,600],[600,410]]',
      customTabletSize: '[[300,250],[515,290],[300,600],[600,410]]',
      customMobileSize: '[[300,170],[300,250],[300,600],[320,50]]',
      customReservedSpace: '[1,1]',
      lazyLoad: true,
      displayAdLabel: true,
      reserveSpace: true,
      pbInternal_cloneId: 'f0fbPnXKTgy722l',
      customKVPs: {
        intext: 'true',
      },
    },
    '30': {
      adType: 'custom',
      customDesktopSize: '[[300,250],[515,290],[600,410]]',
      customTabletSize: '[[300,250],[515,290],[600,410]]',
      customMobileSize: '[[300,170],[300,250],[320,50]]',
      customReservedSpace: '[1,1]',
      lazyLoad: true,
      displayAdLabel: true,
      reserveSpace: true,
      pbInternal_cloneId: 'f0fnloeLVsQ81nI',
      customKVPs: {
        intext: 'true',
      },
    },
    '40': {
      adType: 'custom',
      customDesktopSize: '[[300,250],[515,290],[300,600],[600,410]]',
      customTabletSize: '[[300,250],[515,290],[300,600],[600,410]]',
      customMobileSize: '[[300,170],[300,250],[300,600],[320,50]]',
      customReservedSpace: '[1,1]',
      lazyLoad: true,
      displayAdLabel: true,
      reserveSpace: true,
      pbInternal_cloneId: 'f0fwkTG2juS81QX',
      customKVPs: {
        intext: 'true',
      },
    },
  },
};

export default ArticleListScreen;
