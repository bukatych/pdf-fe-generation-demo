import { Document, Page, PDFViewer, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import data from './table-data.json'

const rendererStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'snow',
    width: '50%',
    padding: 10,
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    fontSize: 14,
    fontWeight: 'light',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    width: '100%',
    marginBottom: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 10,
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'lightgray',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  headerCell: {
    width: `${100 / data.length}%`,
    padding: 5,
  },
  cell: {
    width: `${100 / data.length}%`,
    padding: 5,
  },
  grayRow: {
    backgroundColor: 'lightgray',
  }
});

const keysToRender = ['description', 'price', 'discountPercentage', 'rating', 'stock', 'brand', 'category']

const PDFDocument = ({ title, text, image }) => {
  return (
    <Document>
      <Page size="A4" style={rendererStyles.page}>
        <View style={rendererStyles.title}>
          <Text>{title}</Text>
        </View>
        {image.length > 0 && <Image src={image[0].data_url}/>}
        <View style={rendererStyles.section}>
          <Text>{text}</Text>
        </View>
        <View style={rendererStyles.table}>
          <View style={rendererStyles.headerRow}>
            {data.map(({title}) => <View key={title} style={rendererStyles.headerCell}><Text>{title}</Text></View>)}
          </View>
          {keysToRender.map((key, index) => {
            const rowStyles = [rendererStyles.row]
            if (index % 2 !== 0) {
              rowStyles.push(rendererStyles.grayRow)
            }
            return <View key={key} style={rowStyles}>
              {data.map(item => <View style={rendererStyles.cell} key={item[key]}><Text>{item[key]}</Text></View>)}
            </View>
          })}
        </View>
      </Page>
    </Document>)

}

export default PDFDocument