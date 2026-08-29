---
document_title: "Đặc tả biên soạn tài liệu Synthetic Data for Human-Centric Computer Vision"
version: "1.0"
status: "Quy chuẩn bắt buộc"
updated: "2026-08-29 (UTC+7)"
applies_to:
  - "Bản Markdown nguồn"
  - "Trang Notion xuất bản"
  - "Code, đồ thị, sơ đồ và bài thực hành đi kèm"
reference_style: "Dive into Deep Learning - bản PyTorch, 2022"
---

# Đặc tả biên soạn tài liệu Synthetic Data for Human-Centric Computer Vision

## 0. Mục đích và cách dùng tài liệu này

Tệp này là quy chuẩn để viết lại từ đầu và tiếp tục phát triển tài liệu **Synthetic Data for Human-Centric Computer Vision**. Nó quy định cách lựa chọn thứ tự kiến thức, giải thích thuật ngữ, dùng công thức, viết code, thiết kế hình minh họa, kiểm chứng nội dung và xuất bản lên Notion.

Đây là đặc tả về **cách biên soạn**, không phải dàn ý nội dung bất biến. Trước khi viết một phần lớn, người viết vẫn phải xác định phạm vi, đầu ra học tập và chuỗi phụ thuộc kiến thức của phần đó.

Các từ khóa dưới đây có ý nghĩa bắt buộc:

- **BẮT BUỘC**: thiếu điều kiện này thì nội dung chưa được phép xuất bản.
- **NÊN**: mặc định phải làm; chỉ được bỏ khi có lý do cụ thể và có thể kiểm tra.
- **CẤM**: không được xuất hiện trong bản hoàn chỉnh.

Nếu một yêu cầu trực tiếp mới của người dùng xung đột với tệp này, yêu cầu mới hơn được ưu tiên. Khi xung đột làm thay đổi phương pháp biên soạn lâu dài, phải cập nhật lại tệp này thay vì âm thầm tạo ngoại lệ.

Phiên bản Phần I cũ không còn là nguồn văn bản hoặc bố cục để tái sử dụng. Khi viết lại Phần I, chỉ được giữ những dữ kiện, mục tiêu dự án và ràng buộc đã được kiểm tra lại; không sao chép câu chữ, trình tự giải thích hoặc hình minh họa cũ.

## 1. Mục tiêu của tài liệu

Tài liệu phải giúp người đọc đi từ chỗ biết lập trình và có nền tảng toán học cơ bản đến chỗ có thể:

1. hiểu một hệ thống tạo dữ liệu tổng hợp cho thị giác máy tính lấy con người làm trung tâm;
2. giải thích được vì sao từng thành phần tồn tại và nó biến đổi dữ liệu như thế nào;
3. tự cài đặt các cơ chế nền tảng ở quy mô nhỏ;
4. sử dụng công cụ thực tế để xây dựng một đường ống tạo dữ liệu hoàn chỉnh;
5. kiểm tra hình ảnh, nhãn, hình học, chuyển động và tính nhất quán của dữ liệu;
6. nhận biết giới hạn của dữ liệu tổng hợp và đánh giá liệu dữ liệu đó có giúp mô hình học tốt trên dữ liệu thật hay không.

Mục tiêu không phải là tạo một danh mục thuật ngữ hoặc một bản khảo sát paper. Mỗi phần phải đưa người đọc đến một khả năng mới có thể quan sát hoặc kiểm tra.

### 1.1 Độc giả mặc định

Độc giả mặc định:

- biết Python ở mức đọc và sửa được chương trình;
- có thể đã học đại số tuyến tính, giải tích và xác suất nhưng không được giả định rằng họ nhớ chắc;
- có định hướng AI/ML và có thể đã dùng Unity;
- chưa được giả định là biết đồ họa máy tính, mô hình cơ thể người, phép chiếu camera hoặc quy trình tạo dữ liệu tổng hợp.

Khi cần một kiến thức toán đã học từ trước, tài liệu phải nhắc lại đúng phần cần dùng. Không được yêu cầu người đọc học lại toàn bộ một môn chỉ để hiểu một phép biến đổi đang xuất hiện.

### 1.2 Dự án xuyên suốt

Toàn bộ tài liệu NÊN dùng một dự án xuyên suốt: tạo một mẫu dữ liệu cho một người 3D đang thực hiện động tác, sau đó xuất hình ảnh và các nhãn cần thiết cho bài toán thị giác máy tính.

Ví dụ xuyên suốt phải phát triển dần:

1. một người 3D và một động tác;
2. vị trí, khớp và hình dạng trong không gian;
3. camera, ánh sáng và bối cảnh khi đến đúng thời điểm;
4. ảnh RGB, silhouette, depth, segmentation, keypoint hoặc nhãn khác;
5. kiểm tra sự khớp nhau giữa ảnh và nhãn;
6. tạo nhiều biến thể có kiểm soát;
7. dùng dữ liệu để huấn luyện hoặc đánh giá một mô hình.

Ở đầu tài liệu, dự án này có thể được giới thiệu như một hộp đen để tạo động lực. Bên trong hộp đen chỉ được mở dần khi người đọc đã có đủ khái niệm.

## 2. Những nguyên tắc tiếp thu từ Dive into Deep Learning

Các nguyên tắc dưới đây được rút ra từ phần *Learning by Doing*, *Content and Structure*, *Code*, cặp mục triển khai tuyến tính từ đầu và bằng API cấp cao, cùng cách tổ chức mục phát hiện vật thể trong *Dive into Deep Learning*.

| Mẫu tổ chức trong D2L | Cách áp dụng | Điều chỉnh cho tài liệu này |
| --- | --- | --- |
| Khái niệm được đưa vào đúng lúc cần dùng | Không dạy trước một khối lý thuyết lớn chỉ vì nó có liên quan | Thuật ngữ vẫn phải được giải thích trước lần sử dụng có ý nghĩa đầu tiên |
| Một ví dụ hoàn chỉnh cho một đơn vị học | Mỗi chương có một kết quả chạy được hoặc quan sát được | Các chương dùng chung dự án người 3D để không tạo ra nhiều ví dụ rời rạc |
| Văn bản, công thức, code và kết quả được đan xen | Code xuất hiện ngay sau cơ chế mà nó hiện thực hóa | Mỗi khối code phải có mục đích trước nó và phần đọc kết quả sau nó |
| Triển khai từ đầu rồi mới dùng API cấp cao | Cơ chế cốt lõi được cài đặt ở quy mô nhỏ trước | Chỉ làm hai phiên bản khi việc tự cài đặt thực sự giúp hiểu phần bị công cụ che giấu |
| Quan sát bằng đồ thị hoặc hình sau khi chạy code | Người đọc kiểm tra kết quả bằng mắt và bằng số | Mọi hình phải trả lời một câu hỏi; không dùng hình trang trí |
| Tóm tắt và bài tập cuối mục | Mỗi chương kết thúc bằng kiểm tra nhận thức và thực hành | Thêm một “cổng hoàn thành” có tiêu chí đạt/không đạt |
| Sơ đồ cấu trúc toàn sách | Cho người đọc thấy kiến thức đang nằm ở đâu | Duy trì bản đồ phụ thuộc và cập nhật khi dàn ý thay đổi |

Không được sao chép câu chữ, hình, code hoặc trình tự chương của D2L. Ta sử dụng phương pháp sư phạm của sách, không tạo một bản chuyển thể nội dung.

## 3. Các nguyên tắc không được phá vỡ

### 3.1 Bắt đầu từ một câu hỏi có hậu quả quan sát được

Mỗi chương phải mở bằng một tình huống hoặc thất bại cụ thể. Ví dụ:

- Vì sao tọa độ của cổ tay là ba số nhưng vị trí của nó thay đổi khi đổi hệ quy chiếu?
- Vì sao keypoint xuất ra có thể nằm ngoài cơ thể trong ảnh?
- Vì sao hình người đúng trong Unity nhưng silhouette và nhãn khớp lại lệch nhau một khung hình?

Phần mở đầu phải nói rõ người đọc sẽ tạo ra hoặc sửa được điều gì sau chương. CẤM mở chương bằng một chuỗi định nghĩa trừu tượng chưa gắn với vấn đề.

### 3.2 Một chương, một bước tiến có thể kiểm tra

Mỗi chương phải có một đầu ra chính. Đầu ra có thể là:

- một hình có lớp phủ nhãn đúng;
- một chương trình nhỏ chạy được;
- một phép tính được thay số và kiểm tra ngược;
- một đồ thị cho thấy tác động của việc thay đổi tham số;
- một bộ kiểm tra phát hiện lỗi dữ liệu;
- một quyết định thiết kế được bảo vệ bằng dữ kiện.

Nếu không thể viết một câu mô tả đầu ra, phạm vi chương chưa đủ rõ.

### 3.3 Giải thích trước, gọi tên sau

Khi xuất hiện một ý mới, thứ tự bắt buộc là:

1. cho thấy hiện tượng hoặc nhu cầu;
2. diễn đạt ý bằng ngôn ngữ thông thường;
3. đưa ví dụ nhỏ;
4. mới giới thiệu tên tiếng Việt, tên tiếng Anh và ký hiệu nếu cần;
5. sau đó mới dùng thuật ngữ như từ vựng đã biết.

Ví dụ đúng:

> Một điểm chỉ có ý nghĩa khi ta biết ba con số của nó được đo từ đâu và theo các hướng nào. Bộ quy tắc xác định gốc và các hướng đo đó được gọi là **hệ tọa độ** (*coordinate system*).

Ví dụ sai:

> Ta biến đổi một vector từ local coordinate system sang world coordinate system bằng homogeneous transformation matrix.

Câu sai sử dụng nhiều thuật ngữ trước khi người đọc có mô hình tinh thần cho bất kỳ thuật ngữ nào.

### 3.4 Không giấu bước suy luận quan trọng

Có thể bỏ phép biến đổi đại số lặp lại, nhưng không được bỏ bước làm thay đổi ý nghĩa của đại lượng. Khi chuyển từ điểm 3D sang một hệ tọa độ khác, tài liệu phải nói rõ:

- điểm đang được biểu diễn trong hệ nào;
- phép biến đổi đi theo chiều nào;
- đơn vị là gì;
- vector được viết theo hàng hay cột;
- ma trận nhân bên trái hay bên phải;
- kết quả còn mang cùng ý nghĩa hình học hay không.

### 3.5 Trực giác không thay thế cho kiểm chứng

Ẩn dụ và hình minh họa chỉ giúp hình thành trực giác. Sau trực giác phải có ít nhất một trong các phần sau:

- định nghĩa chính xác;
- phép tính;
- code;
- thí nghiệm;
- phản ví dụ hoặc trường hợp biên.

Không được dùng vài ví dụ đúng để khẳng định một kết luận tổng quát.

## 4. Kiến trúc bắt buộc của một chương

Một chương hoàn chỉnh NÊN đi theo trật tự dưới đây. Có thể gộp hai mục liền nhau, nhưng không được bỏ chức năng sư phạm của chúng.

### 4.1 Vấn đề cần giải quyết

- Mô tả tình huống cụ thể.
- Cho thấy lỗi hoặc giới hạn hiện tại.
- Nêu đầu ra cuối chương.
- Nêu điều kiện đầu vào và kiến thức tiên quyết thực sự cần thiết.

### 4.2 Bức tranh tổng thể

- Dùng một sơ đồ nhỏ để đặt cơ chế mới vào toàn bộ đường ống.
- Chỉ tô nổi phần đang học; các phần chưa học được làm mờ và coi như hộp đen.
- Nói rõ dữ liệu đi vào, phép xử lý và dữ liệu đi ra.

### 4.3 Trực giác bằng ví dụ nhỏ

- Dùng số nhỏ, hình đơn giản hoặc không gian hai chiều nếu nó giữ được bản chất vấn đề.
- Thay đổi một yếu tố tại một thời điểm.
- Cho người đọc dự đoán kết quả trước khi xem đáp án khi phù hợp.

### 4.4 Định nghĩa và quy ước

- Giới thiệu thuật ngữ đúng lúc.
- Ghi rõ ký hiệu, đơn vị, chiều tensor và quy ước trục.
- Nếu có nhiều quy ước hợp lệ, chọn một quy ước chính và cho biết cách nhận ra quy ước khác.

### 4.5 Mô hình hóa chính xác

- Đưa công thức sau khi nhu cầu của công thức đã rõ.
- Giải thích từng ký hiệu ngay cạnh công thức.
- Kiểm tra kích thước, đơn vị và chiều biến đổi.
- Thay một ví dụ số hoàn chỉnh.
- Kiểm tra ngược nếu phép toán cho phép.

### 4.6 Triển khai tối thiểu từ đầu

- Chỉ dùng các phép toán nền tảng để lộ cơ chế cốt lõi.
- Code phải ngắn đủ để người đọc theo dõi được từ đầu đến cuối.
- Có `assert`, kiểm tra hình dạng hoặc đối chiếu với kết quả tính tay.
- Không dùng helper ẩn cho chính cơ chế đang được dạy.

### 4.7 Triển khai thực tế

- Dùng Unity, NumPy, PyTorch, OpenCV, Blender hoặc công cụ thích hợp.
- Nói rõ phần nào được thư viện thực hiện thay.
- So sánh kết quả với bản tối thiểu thay vì chỉ đưa code mới.
- Không lặp lại bản tối thiểu nếu API cấp cao không tạo thêm giá trị thực hành.

### 4.8 Thí nghiệm và cách đọc kết quả

- Thay đổi một tham số có ý nghĩa.
- Hiển thị kết quả bằng hình hoặc đồ thị.
- Nêu điều được quan sát, điều không thể kết luận và nguyên nhân có thể gây nhiễu.

### 4.9 Lỗi thường gặp và trường hợp biên

Ít nhất phải kiểm tra:

- đầu vào sai hoặc thiếu;
- giá trị suy biến;
- sai đơn vị hoặc sai quy ước;
- dữ liệu nằm ngoài miền hợp lệ;
- sai khác giữa phiên bản công cụ nếu có;
- trường hợp hình trông hợp lý nhưng nhãn số bị sai.

### 4.10 Tóm tắt

Tóm tắt từ ba đến bảy ý. Mỗi ý phải là một kết luận hoặc khả năng người đọc vừa đạt được, không chỉ lặp tên đề mục.

### 4.11 Bài tập

Mỗi chương NÊN có ba tầng:

1. **Kiểm tra hiểu**: giải thích hoặc dự đoán mà không cần code dài.
2. **Biến đổi ví dụ**: thay tham số, dữ liệu hoặc quy ước và quan sát hậu quả.
3. **Mở rộng nhỏ**: thêm một khả năng vào dự án xuyên suốt.

### 4.12 Cổng hoàn thành

Cổng hoàn thành phải có tiêu chí nhị phân hoặc định lượng. Ví dụ:

- sai số kiểm tra ngược nhỏ hơn một ngưỡng đã giải thích;
- hình chiếu của khớp nằm đúng trên lớp phủ ảnh;
- tất cả tensor có hình dạng dự kiến;
- chương trình tái tạo được cùng kết quả khi cố định seed;
- bộ kiểm tra cố ý bắt được ít nhất một mẫu dữ liệu lỗi.

Không vượt qua cổng thì chưa được dùng kết quả của chương làm tiền đề cho chương sau.

## 5. Quy trình giải thích một khái niệm mới

Mỗi khái niệm mới phải đi qua sáu lớp. Không nhất thiết đặt thành sáu tiêu đề, nhưng thứ tự phải nhận ra được.

1. **Hiện tượng**: người đọc nhìn thấy điều gì?
2. **Mô hình tinh thần**: cách hình dung đơn giản nhất mà không sai bản chất là gì?
3. **Tên gọi**: khái niệm được gọi là gì?
4. **Biểu diễn chính xác**: định nghĩa, ký hiệu hoặc cấu trúc dữ liệu là gì?
5. **Thao tác**: ta dùng nó để tính hoặc xây dựng điều gì?
6. **Giới hạn**: khi nào mô hình tinh thần hoặc công thức không còn đủ?

Mỗi tiểu mục NÊN giới thiệu không quá năm thuật ngữ mới. Nếu cần nhiều hơn, phải tách tiểu mục hoặc thêm một bản đồ thuật ngữ trước khi tiếp tục.

## 6. Quy chuẩn thuật ngữ và ký hiệu

### 6.1 Lần xuất hiện đầu tiên

Mẫu mặc định:

> **Tên tiếng Việt** (*tên tiếng Anh*, viết tắt nếu có) là ...

Sau lần đầu, ưu tiên tên tiếng Việt. Chỉ giữ tiếng Anh khi đó là tên API, tên lớp, tên trường dữ liệu hoặc thuật ngữ mà bản dịch làm mất độ chính xác.

### 6.2 Không đổi tên giữa chừng

Mỗi khái niệm phải có một tên chính. Không luân phiên tùy ý giữa các từ gần nghĩa như “tọa độ cục bộ”, “tọa độ local”, “không gian vật thể” nếu chưa giải thích quan hệ giữa chúng.

Mỗi phần lớn phải duy trì một bảng thuật ngữ nội bộ gồm:

- tên tiếng Việt;
- tên tiếng Anh;
- ký hiệu;
- định nghĩa một câu;
- nơi giới thiệu lần đầu;
- các từ không được dùng thay thế.

### 6.3 Viết tắt

- CẤM dùng viết tắt trước khi viết đầy đủ.
- Không tạo viết tắt cho từ chỉ xuất hiện vài lần.
- Khi một viết tắt quay lại sau một khoảng dài, phải nhắc tên đầy đủ bằng một cụm ngắn.

### 6.4 Ký hiệu

- Một ký hiệu chỉ mang một nghĩa trong cùng một phần lớn.
- Không dùng cùng chữ `T` cho cả thời gian và ma trận biến đổi.
- Vector, ma trận, điểm, scalar và hệ tọa độ phải được phân biệt nhất quán.
- Khi code và công thức dùng thứ tự chiều khác nhau, phải chỉ ra trực tiếp.

## 7. Quy chuẩn toán học

### 7.1 Công thức phải giải quyết một nhu cầu đã được nêu

Trước mỗi công thức quan trọng, phải có một câu trả lời cho câu hỏi: “Ta cần tính đại lượng này để làm gì?”

Sau công thức phải có:

1. ý nghĩa của vế trái;
2. ý nghĩa và miền của từng biến;
3. hình dạng hoặc số chiều;
4. đơn vị nếu có;
5. điều kiện áp dụng;
6. một kiểm tra nhanh.

### 7.2 Ví dụ số bắt buộc

Mỗi phép biến đổi nền tảng phải có ít nhất một ví dụ số đủ nhỏ để tính tay. Ví dụ số phải:

- thay giá trị vào từng bước;
- giữ đủ chữ số để tránh tạo sai lệch giả;
- cho biết làm tròn ở đâu;
- thay ngược hoặc đối chiếu bằng code khi có thể.

### 7.3 Hình học và hệ tọa độ

Mọi mục có hình học 3D phải khai báo rõ:

- hệ tay trái hay tay phải;
- trục nào hướng lên, sang phải và về trước;
- gốc tọa độ;
- đơn vị chiều dài;
- điểm và hướng khác nhau thế nào;
- thứ tự nhân ma trận;
- chiều của phép biến đổi;
- quy ước của Unity, thư viện toán và định dạng dữ liệu liên quan.

Nếu hai công cụ dùng quy ước khác nhau, phải có hình đối chiếu và một test chuyển đổi tối thiểu.

### 7.4 Phân biệt mức độ chắc chắn

Khi cần, nội dung phải phân biệt rõ:

- **Dữ kiện đã xác minh**: có nguồn hoặc được kiểm tra trực tiếp.
- **Suy luận**: kết luận rút ra từ dữ kiện đã nêu.
- **Giả định**: điều tạm coi là đúng để tiếp tục mô hình hóa.
- **Ước lượng**: giá trị gần đúng và cách tạo ra nó.
- **Lựa chọn thiết kế**: một phương án hợp lý nhưng không phải chân lý duy nhất.

## 8. Quy chuẩn code và thí nghiệm

### 8.1 Code phải chạy được

Mọi khối code được mô tả là hoàn chỉnh BẮT BUỘC phải được chạy thử trong môi trường có sẵn hoặc ghi rõ chưa thể chạy vì thiếu phụ thuộc nào. Không được tuyên bố “đã kiểm thử” khi chỉ đọc bằng mắt.

Mỗi ví dụ chạy được cần có:

- phiên bản ngôn ngữ và thư viện có ảnh hưởng đến kết quả;
- đầu vào;
- đầu ra dự kiến;
- seed khi có ngẫu nhiên;
- ít nhất một kiểm tra tự động;
- cách chạy;
- lỗi dự kiến khi đầu vào không hợp lệ.

### 8.2 Nhịp văn bản - code - kết quả

Mỗi khối code phải nằm trong chuỗi:

1. **Mục đích**: đoạn code sắp kiểm tra điều gì?
2. **Code**: phần tối thiểu cần chạy.
3. **Kết quả**: output, hình hoặc metric thực tế.
4. **Cách đọc**: đặc điểm nào chứng minh code đúng hoặc sai?
5. **Giới hạn**: kết quả này chưa chứng minh được điều gì?

CẤM đặt nhiều khối code liên tiếp mà không giải thích kết quả trung gian.

### 8.3 Từ đầu và bằng công cụ

Tạo hai phiên bản khi thỏa cả hai điều kiện:

- công cụ cấp cao đang che một cơ chế mà người đọc cần hiểu để gỡ lỗi hoặc tùy biến;
- phiên bản từ đầu có thể giữ đủ nhỏ để đọc được.

Phiên bản từ đầu ưu tiên NumPy hoặc phép toán tensor cơ bản. Phiên bản thực tế dùng API phù hợp. Hai phiên bản phải dùng cùng đầu vào kiểm tra và cho kết quả tương đương trong sai số đã nêu.

### 8.4 Dữ liệu và hình dạng tensor

Khi một tensor mới xuất hiện, phải ghi hình dạng bằng tên chiều trước khi chỉ ghi số. Ví dụ:

> `joints` có hình dạng `(số_khung_hình, số_khớp, 3)`; chiều cuối chứa `x, y, z`.

Không được để người đọc suy ra ngầm thứ tự chiều từ code.

### 8.5 Thí nghiệm có đối chứng

Khi cho thấy tác động của một yếu tố, chỉ thay đổi một yếu tố chính trong mỗi thí nghiệm. Nếu không thể cô lập, phải nói rõ các biến gây nhiễu.

NÊN có ba trường hợp:

- cấu hình đúng;
- một lỗi cố ý;
- một trường hợp biên.

## 9. Hệ thống hình minh họa

Hình ảnh là một phần của lập luận, không phải phần trang trí. Mật độ hình NÊN cao: gần như mỗi bước chuyển khái niệm quan trọng đều có một hình, sơ đồ hoặc đồ thị. Tuy nhiên, mỗi hình phải có nhiệm vụ riêng.

### 9.1 Các loại hình và nhiệm vụ

| Loại hình | Dùng để trả lời |
| --- | --- |
| Sơ đồ đường ống | Dữ liệu đi từ đâu đến đâu và phần đang học nằm ở đâu? |
| Hình hệ trục hoặc không gian | Gốc, hướng, điểm và phép biến đổi nằm ở đâu? |
| Hình trước - sau | Một phép xử lý đã thay đổi điều gì? |
| Lớp phủ trên ảnh | Nhãn có khớp với dữ liệu quan sát hay không? |
| Đồ thị | Một đại lượng thay đổi theo tham số hoặc thời gian như thế nào? |
| Hình đúng - sai | Lỗi có biểu hiện gì và cách nhận ra ra sao? |
| Bảng nhỏ | Cần đối chiếu chính xác nhiều quy ước hoặc hình dạng dữ liệu nào? |

### 9.2 Trình tự quanh một hình

Mỗi hình phải có ba phần:

1. **Dẫn vào hình**: đặt câu hỏi người đọc cần quan sát.
2. **Chú thích hình**: nói hình chứa gì, không lặp lại nguyên tiêu đề.
3. **Đọc hình**: chỉ ra quan sát quan trọng và kết luận hợp lệ.

CẤM chèn hình rồi chuyển ngay sang chủ đề khác.

### 9.3 Tỉ lệ và kích thước

- CẤM kéo giãn hình theo cả chiều rộng và chiều cao.
- BẮT BUỘC giữ nguyên tỉ lệ gốc khi đưa lên Notion.
- Sơ đồ đường ống ưu tiên tỉ lệ ngang `16:9` hoặc `3:2`.
- Đồ thị ưu tiên `4:3`; hình không gian có thể dùng `1:1` nếu bố cục thật sự cần.
- Hình dọc không được phóng toàn chiều rộng trang nếu tạo khoảng trống hoặc tỷ lệ mất cân đối; phải thiết kế lại, cắt hợp lý hoặc đặt cạnh hình liên quan.
- Sơ đồ NÊN có tối đa bảy nút chính. Nếu nhiều hơn, tách thành tổng quan và chi tiết.
- Chữ trong hình phải đọc được ở chiều rộng hiển thị khoảng `900-1100 px`; kích thước thiết kế không nhỏ hơn tương đương `18 px`.
- Hình raster NÊN có chiều rộng ít nhất `1600 px` cho bản toàn chiều rộng. Sơ đồ chính xác ưu tiên SVG hoặc định dạng vector khi nơi xuất bản hỗ trợ.
- Không để khoảng trắng chiếm phần lớn khung chỉ để ép mọi hình có cùng kích thước.

### 9.4 Quy ước màu

- Trục `X`: đỏ.
- Trục `Y`: xanh lá.
- Trục `Z`: xanh dương.
- Dữ liệu đầu vào: xanh lam hoặc xám.
- Phép xử lý: tím.
- Kết quả hợp lệ: xanh lá.
- Lỗi hoặc vùng cần chú ý: đỏ/cam.

Không đổi ý nghĩa màu giữa các chương. Màu không được là phương tiện duy nhất để phân biệt; phải có nhãn, kiểu đường hoặc hình dạng đi kèm.

### 9.5 Chọn công cụ tạo hình

- Sơ đồ có quan hệ chính xác: Mermaid, SVG, công cụ vẽ vector hoặc code.
- Đồ thị số liệu: Matplotlib, Plotly hoặc công cụ biểu đồ có dữ liệu nguồn.
- Hình 3D và lớp phủ: xuất trực tiếp từ Unity, Blender, Open3D hoặc code kiểm chứng.
- Ảnh sinh bằng mô hình tạo ảnh: chỉ dùng cho minh họa bối cảnh hoặc trực giác không yêu cầu tỷ lệ, tọa độ hay nhãn chính xác.

CẤM dùng ảnh sinh để chứng minh một quan hệ hình học, một con số hoặc độ chính xác của nhãn.

### 9.6 Kiểm tra hình trước khi xuất bản

Mỗi hình phải vượt qua các câu hỏi:

- Có đúng tỉ lệ và không bị méo không?
- Chữ có đọc được ở chế độ xem bình thường không?
- Màu, trục và ký hiệu có nhất quán không?
- Có phần tử nào bị cắt hoặc chồng lên nhau không?
- Hình có trả lời đúng câu hỏi đã đặt trước nó không?
- Văn bản sau hình có giải thích quan sát quan trọng không?
- Nếu bỏ hình đi, người đọc có mất một phần hiểu biết thật sự không?

Nếu câu cuối là “không”, hình đó có khả năng chỉ là trang trí và nên bị loại.

## 10. Liên kết kiến thức giữa các chương

### 10.1 Bản đồ phụ thuộc

Trước khi viết một phần lớn, phải lập bản đồ:

- khái niệm nào là đầu vào;
- khái niệm nào được giới thiệu;
- chương nào sử dụng lại nó;
- đầu ra thực hành nào được chuyển sang chương sau.

Không được tham chiếu một khái niệm chưa được định nghĩa, trừ khi nó được đặt trong hộp đen và người đọc chưa cần thao tác với nó.

### 10.2 Ví dụ xuyên suốt phải tích lũy

Mỗi chương NÊN tái sử dụng đầu ra của chương trước. Khi cần thay ví dụ, phải nói lý do: ví dụ cũ không còn đủ để biểu diễn trường hợp đang học, chứ không chỉ vì ví dụ mới trông hấp dẫn hơn.

### 10.3 Ôn lại đúng lúc

Khi một khái niệm quay lại sau nhiều chương:

- nhắc lại bằng một hoặc hai câu;
- liên kết về nơi định nghĩa đầy đủ;
- không chép lại toàn bộ phần cũ;
- chỉ mở rộng khi ngữ cảnh mới tạo ra ý nghĩa mới.

## 11. Nguồn, tính hiện hành và sự trung thực về bất định

### 11.1 Ưu tiên nguồn

Thứ tự ưu tiên mặc định:

1. paper gốc;
2. tài liệu chính thức của công cụ hoặc định dạng;
3. mã nguồn hoặc đặc tả chính thức;
4. sách và tài liệu học thuật có uy tín;
5. bài viết kỹ thuật thứ cấp khi nguồn sơ cấp không giải thích đủ.

Các thông tin có thể thay đổi như API, phiên bản Unity/PyTorch, định dạng tệp hoặc trạng thái dự án phải được kiểm tra tại thời điểm viết và ghi phiên bản hoặc ngày truy cập khi cần.

### 11.2 Không biến lựa chọn thành chân lý

Phải phân biệt:

- điều bắt buộc về mặt toán học;
- quy ước của một công cụ;
- lựa chọn thiết kế của tài liệu;
- thực hành phổ biến;
- kết quả thực nghiệm chỉ đúng trong cấu hình đã thử.

Nếu chưa đủ bằng chứng, phải viết rõ “chưa đủ căn cứ”, nêu dữ kiện còn thiếu và cách kiểm tra tiếp theo.

### 11.3 Trích dẫn

- Mỗi khẳng định kỹ thuật không hiển nhiên NÊN có nguồn gần nơi xuất hiện.
- Không trích một nguồn thứ cấp để thay cho paper hoặc tài liệu gốc đang có sẵn.
- Không bịa số liệu, benchmark, URL hoặc kết quả thí nghiệm.
- Hình lấy từ nguồn ngoài phải có giấy phép phù hợp và chú thích nguồn.
- Hình tự dựng dựa trên một nguồn phải ghi “dựng lại từ” nếu quan hệ chính bắt nguồn từ nguồn đó.

## 12. Văn phong

### 12.1 Ngôn ngữ

- Mặc định viết bằng tiếng Việt.
- Câu trực tiếp, tránh lối dịch từng chữ từ tiếng Anh.
- Mỗi đoạn tập trung vào một ý chính và thường dài từ hai đến năm câu.
- Ưu tiên động từ cụ thể: “biến đổi”, “đo”, “xuất”, “so sánh”, “kiểm tra”.
- Không dùng giọng quảng cáo hoặc khẳng định quá mức.
- Không gọi một cơ chế là “đơn giản”, “hiển nhiên” hoặc “dễ” nếu chưa chỉ ra vì sao.

### 12.2 Mức độ chi tiết

Chi tiết phải tập trung vào bước có khả năng làm người đọc hiểu sai hoặc triển khai sai. Không kéo dài bằng lịch sử, liệt kê biến thể hoặc thuật ngữ bên lề trước khi người đọc hoàn thành mục tiêu chính.

Thông tin mở rộng được đặt sau luồng chính dưới một trong các nhãn:

- **Đào sâu**: mở rộng lý thuyết.
- **Trong thực tế**: lưu ý triển khai.
- **Bẫy thường gặp**: lỗi dễ mắc.
- **Ngoài phạm vi hiện tại**: khái niệm sẽ học sau.

### 12.3 Tiêu đề, danh sách và bảng

- Tiêu đề phải mô tả câu hỏi hoặc khả năng, không chỉ là một danh từ rộng.
- Danh sách dùng khi có các phần tử song song thật sự.
- Bảng dùng cho so sánh chính xác theo cùng tiêu chí.
- Không biến toàn bộ chương thành các gạch đầu dòng; luồng giải thích chính vẫn phải là văn xuôi có liên kết.

## 13. Quy chuẩn Markdown và Notion

### 13.1 Markdown nguồn

- Chỉ có một tiêu đề cấp 1 cho mỗi tệp chương hoặc phần.
- Không nhảy cấp tiêu đề.
- Code phải ghi đúng ngôn ngữ.
- Công thức ngắn dùng inline; công thức chính dùng block và có giải thích ngay sau.
- Mỗi hình có tên tệp ổn định, alt text có nghĩa và chú thích đánh số.
- Liên kết nội bộ phải dùng tên mục ổn định, tránh “phần trên” hoặc “hình dưới” nếu có thể thay đổi bố cục.

### 13.2 Khi đưa lên Notion

- Không dùng bảng quá rộng; mặc định không quá năm cột.
- Sơ đồ Mermaid phải được kết xuất thành hình sắc nét nếu Notion không hiển thị trực tiếp.
- Code dài được tách thành tệp hoặc khối riêng; trong luồng chính chỉ giữ phần đang giải thích.
- Hình phải được kiểm tra ở kích thước hiển thị thật, không chỉ nhìn tệp gốc.
- Chú thích hình nằm ngay dưới hình và không bị tách khỏi đoạn đọc hình.
- Callout chỉ dùng cho cảnh báo, quy ước hoặc kết luận cần ghi nhớ; không dùng cho mọi đoạn.

## 14. Quy trình biên soạn một phần lớn

### Giai đoạn A - Thiết kế trước khi viết

1. Viết đầu ra cuối phần bằng một câu có thể kiểm tra.
2. Xác định người đọc đã biết gì và chưa được giả định biết gì.
3. Lập bản đồ phụ thuộc khái niệm.
4. Chọn ví dụ xuyên suốt và dữ liệu tối thiểu.
5. Lập danh sách thuật ngữ mới theo thứ tự xuất hiện.
6. Lập storyboard hình: mỗi hình trả lời câu hỏi nào?
7. Xác định code, phép tính và cổng hoàn thành.
8. Cho người dùng duyệt cấu trúc nếu phạm vi hoặc thứ tự thay đổi đáng kể.

### Giai đoạn B - Viết và thực thi

1. Viết vấn đề và trực giác trước.
2. Tạo hình nền tảng trước khi viết đoạn phụ thuộc vào hình.
3. Viết công thức cùng ví dụ số và kiểm tra kích thước.
4. Viết code tối thiểu, chạy và lưu output thật.
5. Viết bản dùng công cụ khi có giá trị.
6. Thêm lỗi cố ý và trường hợp biên.
7. Viết tóm tắt, bài tập và cổng hoàn thành sau khi toàn bộ luồng đã chạy được.

### Giai đoạn C - Kiểm tra đối kháng

Người viết phải tự tìm cách làm nội dung sai bằng các câu hỏi:

- Có thuật ngữ nào được dùng trước khi định nghĩa không?
- Có bước biến đổi nào đổi hệ quy chiếu, đơn vị hoặc ý nghĩa nhưng không nói rõ không?
- Hình có thể khiến người đọc suy ra một quan hệ không đúng tỷ lệ không?
- Code có phụ thuộc ẩn, seed, tệp hoặc phiên bản không?
- Một output trông hợp lý có thể vẫn sai nhãn không?
- Có phản ví dụ nào phá kết luận đang viết không?
- Bằng chứng có thực sự hỗ trợ mức độ khẳng định không?
- Có đang giữ lại một đoạn chỉ vì đã tốn công viết nó không?

### Giai đoạn D - Xuất bản và duyệt

1. Kiểm tra Markdown.
2. Kiểm tra toàn bộ liên kết và tệp đi kèm.
3. Kiểm tra hình ở kích thước thật.
4. Chạy lại code theo hướng dẫn từ môi trường sạch ở mức khả thi.
5. Đối chiếu cổng hoàn thành.
6. Đưa lên Notion với đúng thứ tự văn bản - hình - chú thích - đọc hình.
7. Dừng để người dùng duyệt sau mỗi phần lớn trước khi viết phần kế tiếp, trừ khi người dùng yêu cầu viết liên tục.

## 15. Tiêu chí đạt/không đạt

### 15.1 Lỗi chặn xuất bản

Chỉ cần có một lỗi dưới đây, nội dung chưa đạt:

- thuật ngữ cốt lõi được dùng trước khi giải thích;
- công thức thiếu định nghĩa ký hiệu hoặc sai kích thước;
- code được gọi là chạy được nhưng chưa chạy thử và không ghi giới hạn;
- hình bị méo, chữ không đọc được hoặc dùng sai quy ước trục;
- hình và nhãn không khớp nhưng không được phát hiện;
- khẳng định hiện hành không có kiểm chứng phù hợp;
- chương không có đầu ra quan sát được;
- chương phụ thuộc vào kiến thức chưa dạy mà không đặt nó trong hộp đen;
- bài thực hành không có tiêu chí hoàn thành.

### 15.2 Bảng kiểm chất lượng

| Nhóm | Câu hỏi đạt |
| --- | --- |
| Mục tiêu | Người đọc biết mình sẽ tạo hoặc kiểm tra được gì? |
| Trình tự | Mỗi khái niệm xuất hiện sau nhu cầu của nó? |
| Thuật ngữ | Tên, định nghĩa và ký hiệu nhất quán? |
| Toán | Có điều kiện, kích thước, ví dụ số và kiểm tra? |
| Code | Chạy được, có output thật và kiểm tra tự động? |
| Hình | Không méo, dễ đọc, có nhiệm vụ và được giải thích? |
| Thực nghiệm | Kết luận không vượt quá dữ liệu quan sát? |
| Nguồn | Nguồn sơ cấp và thông tin phiên bản đã được kiểm tra? |
| Liên kết | Đầu ra chương này thật sự dùng được cho chương sau? |
| Hoàn thành | Có summary, bài tập và cổng đạt/không đạt? |

## 16. Chỉ thị riêng cho việc xây lại Phần I

1. **Đập bỏ cấu trúc cũ**: không sửa câu, đổi ảnh hoặc chắp vá trên bố cục cũ.
2. **Thiết kế lại từ đầu**: trước khi viết văn xuôi, phải có đầu ra của Phần I, bản đồ phụ thuộc, ví dụ xuyên suốt, danh sách thuật ngữ và storyboard hình.
3. **Mở bằng sản phẩm đích**: cho người đọc thấy một mẫu dữ liệu tổng hợp hoàn chỉnh ở mức hộp đen, rồi đặt câu hỏi cần học gì để tạo và kiểm tra nó.
4. **Không mở bằng một chương toán thuần túy**: nền tảng hình học chỉ xuất hiện khi nó giải quyết một vấn đề của mẫu dữ liệu đang xây dựng.
5. **Mỗi cơ chế hình học có ba lớp**: hình trực giác, phép tính số nhỏ và code kiểm tra.
6. **Tạo lại toàn bộ hình**: không tái sử dụng các hình cũ có tỷ lệ hoặc bố cục chưa đạt. Mỗi hình mới phải qua bảng kiểm ở Mục 9.6.
7. **Một ví dụ tích lũy**: không thay nhân vật, động tác hoặc quy ước liên tục giữa các mục nếu không có lý do.
8. **Kết thúc bằng một mini-lab**: người đọc phải tạo được một đầu ra có thể kiểm chứng, không chỉ trả lời câu hỏi lý thuyết.
9. **Phạm vi nội dung phải được chốt bằng dàn ý mới**: không mặc định ranh giới chương cũ vẫn đúng chỉ vì tên “Phần I” được giữ lại.
10. **Chỉ bắt đầu Phần II sau khi Phần I được người dùng duyệt**.

## 17. Mẫu Markdown cho một chương

Mẫu dưới đây là khung kiểm soát, không phải yêu cầu phải giữ nguyên mọi tiêu đề.

````markdown
# [Số chương]. [Tên chương diễn tả khả năng đạt được]

> **Đầu ra cuối chương:** [Một sản phẩm hoặc kiểm tra quan sát được]
>
> **Cần biết trước:** [Chỉ các khái niệm thật sự cần]

## [Tình huống hoặc lỗi cụ thể]

[Mô tả vấn đề, hậu quả và câu hỏi dẫn đường.]

![Alt text mô tả nội dung](images/[ten-hinh].png)

*Hình [x.y] - [Hình chứa gì và dùng để quan sát điều gì].*

[Đoạn đọc hình: chỉ ra quan sát và kết luận hợp lệ.]

## Bức tranh tổng thể

[Sơ đồ phần đang học trong toàn bộ đường ống.]

## Trực giác từ một ví dụ nhỏ

[Ví dụ hai chiều, số nhỏ hoặc một khung hình tối thiểu.]

## Định nghĩa và quy ước

**[Tên tiếng Việt]** (*English term*, ký hiệu) là ...

| Ký hiệu | Ý nghĩa | Hình dạng/đơn vị |
| --- | --- | --- |
| ... | ... | ... |

## Mô hình hóa chính xác

$$
[Công thức]
$$

[Giải thích từng biến, điều kiện và chiều biến đổi.]

### Ví dụ số

[Thay số từng bước và kiểm tra ngược.]

## Triển khai tối thiểu từ đầu

[Mục đích của code.]

```python
# Code tối thiểu chạy được
```

**Kết quả dự kiến/đã chạy:**

```text
[Output]
```

[Cách đọc output và điều nó chưa chứng minh.]

## Triển khai bằng công cụ thực tế

[Phần API thực hiện thay và cách đối chiếu với bản tối thiểu.]

## Thí nghiệm: thay đổi một yếu tố

[Giả thuyết, biến thay đổi, biến giữ nguyên, kết quả và giới hạn.]

## Bẫy thường gặp và trường hợp biên

- [Lỗi 1: biểu hiện, nguyên nhân, cách phát hiện]
- [Lỗi 2: biểu hiện, nguyên nhân, cách phát hiện]
- [Trường hợp biên]

## Tóm tắt

- [Kết luận 1]
- [Kết luận 2]
- [Khả năng vừa đạt được]

## Bài tập

1. **Kiểm tra hiểu:** ...
2. **Biến đổi ví dụ:** ...
3. **Mở rộng dự án:** ...

## Cổng hoàn thành

- [ ] [Tiêu chí nhị phân hoặc định lượng 1]
- [ ] [Tiêu chí 2]
- [ ] [Tiêu chí 3]

## Nguồn

1. [Nguồn sơ cấp, phiên bản/ngày khi cần]
````

## 18. Bảng kiểm ngắn trước mỗi lần giao bản thảo

- [ ] Chương bắt đầu bằng vấn đề và đầu ra cụ thể.
- [ ] Không có thuật ngữ cốt lõi nào xuất hiện trước định nghĩa.
- [ ] Ví dụ xuyên suốt được giữ nhất quán.
- [ ] Mỗi công thức có ý nghĩa biến, hình dạng, điều kiện và ví dụ số.
- [ ] Code đã chạy; output trong tài liệu là output thật.
- [ ] Có ít nhất một kiểm tra tự động hoặc kiểm tra ngược.
- [ ] Mỗi hình có câu hỏi dẫn vào, chú thích và đoạn đọc hình.
- [ ] Không có hình bị méo, chữ nhỏ hoặc khoảng trắng mất cân đối.
- [ ] Có trường hợp sai và trường hợp biên.
- [ ] Kết luận không vượt quá bằng chứng.
- [ ] Nguồn và phiên bản đã được kiểm tra.
- [ ] Có tóm tắt, bài tập và cổng hoàn thành.
- [ ] Bản Notion đã được xem lại ở kích thước hiển thị thật.

## 19. Cơ sở tham khảo phương pháp

Các phần của *Dive into Deep Learning* được dùng để rút ra phương pháp biên soạn:

- *Learning by Doing*, phần mở đầu, trang in 2-3: đưa kiến thức vào đúng lúc cần, một ví dụ chạy được cho một đơn vị học và đan xen code với giải thích.
- *Content and Structure* và *Code*, trang in 3-5: cho người đọc thấy cấu trúc toàn sách và dùng code như phương tiện hình thành trực giác qua thử nghiệm.
- Mục 3.2 và 3.3, trang in 96-106: triển khai một cơ chế từ đầu, kiểm tra bằng output, sau đó chuyển sang API cấp cao trên cùng dữ liệu.
- Mục 13.3, trang in 577-580: bắt đầu từ bài toán thị giác cụ thể, giới thiệu biểu diễn, viết hàm chuyển đổi, kiểm tra hai chiều, trực quan hóa rồi kết thúc bằng tóm tắt và bài tập.

Tài liệu này chỉ tiếp thu cấu trúc sư phạm. Nội dung Synthetic Data phải được kiểm chứng bằng nguồn chuyên ngành và thí nghiệm riêng.

