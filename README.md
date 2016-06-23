# react-native-pager

## install 

```bash
npm install react-native-pager
```

## usage

```javascript
import ViewPager from "react-native-pager";

class App extends React.Component {

    render() {
        return (
            <ViewPager
                loop={true}
                onPageChanged={index => {}}>
                <View>
                    // View1
                </View>
                <View>
                    // View2
                </View>
                <View>
                    // View3
                </View>
                <View>
                    // View4
                </View>
            </ViewPager>
        )
    }
}
```