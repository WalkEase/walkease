import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    main_container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    no_dog_container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#718355',
        maxHeight: '50%'
    },

    header: {
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10,
        paddingTop: 10,
        fontSize: 24,
        color: "black",
        borderRadius: 10,

    },

    sectionHeader: {
        paddingBottom: 10,
        paddingRight: 10,
        fontWeight: 'bold',

    },


    item_name: {

        textAlign: 'center',
        borderRadius: 10,
        backgroundColor: "#386641",
        paddingTop: 10,
        color: "white",
        fontSize: 20,
        height: 40,
    },

    item_born: {

        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 40,
        backgroundColor: 'white',
        color: '#386641',
        fontWeight: '500',
        textAlign: "center",
    },



    item_info: {

        fontSize: 14,
        paddingVertical: 20,
        paddingHorizontal: 40,
        backgroundColor: 'white',
        color: '#386641',
        fontWeight: '500',
        textAlign: "justify",
    },

    header_info_map: {
        marginVertical: 10,
        marginHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: "white",
    },

    map_img: {
        width: 35,
        height: 35,
    },
    img: {
        width: "100%",
        height: 180,
    },

    addDog: {
        fontSize: 14,
        fontWeight: 'bold',
        margin: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        color: 'black',
        backgroundColor: 'white',
    },

    edit: {
        fontSize: 16,
        width: "95%",
        fontWeight: 'bold',
        margin: 10,
        paddingVertical: 5,
        paddingHorizontal: 30,

        borderWidth: 2,
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 20,
    }
});