
import { useEffect } from 'react';
import $ from 'jquery';
import { ArrowUp } from 'lucide-react';

const JQueryEffect = () => {
    useEffect(() => {
        // jQuery code for back-to-top functionality
        const $btn = $('#back-to-top');

        $(window).scroll(function () {
            if ($(window).scrollTop()! > 300) {
                $btn.fadeIn();
            } else {
                $btn.fadeOut();
            }
        });

        $btn.on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, '300');
        });

        return () => {
            // Cleanup
            $(window).off('scroll');
            $btn.off('click');
        };
    }, []);

    return (
        <button
            id="back-to-top"
            className="fixed bottom-8 right-8 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hidden hover:bg-primary/90 transition-colors"
            aria-label="Back to top"
            style={{ display: 'none' }} // Initially hidden, jQuery will handle show/hide
        >
            <ArrowUp size={24} />
            <span className="sr-only">Back to top</span>
        </button>
    );
};

export default JQueryEffect;
