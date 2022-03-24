import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#718355',
        maxHeight: '90%'
    },

    no_dog_container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#718355',
        maxHeight: '50%'
    },

    header: {
        paddingTop: 100,
        fontSize: 24,
    },
    sectionHeader: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        justifyContent: 'center',
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    img: {
        width: 193,
        height: 110,
    },
    addDog: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        color: 'black',
        backgroundColor: 'white',
    },
    edit: {
        fontSize: 10,
        width: "50%",
        fontWeight: 'bold',
        margin: 10,
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 15,
        color: 'black',
        backgroundColor: 'white',
    }
});