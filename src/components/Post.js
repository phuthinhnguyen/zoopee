import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    hidden: { opacity: 0, scale: 0 }
}
const Post = ({ item }) => {
    const control = useAnimation()
    const [ref, inView] = useInView()
    useEffect(() => {
        if (inView) {
            control.start("visible");
        }
        else {
            control.start("hidden");
        }
    }, [control, inView]);
    return (
        <motion.div variants={boxVariant}
            ref={ref}
            initial="hidden"
            animate={control}
            className="box"
            variants={boxVariant}>
           {item}
        </motion.div>
    );
};
export default Post;